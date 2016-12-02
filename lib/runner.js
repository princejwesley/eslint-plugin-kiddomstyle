#!/usr/bin/env node

/**
 * @fileoverview This CLI helps to run lint rules as errors in files
 *   which has new changes that are yet to be pushed to remote branch
 * @author Kiddom Inc.
 */

const { CLIEngine, linter } = require("eslint");
const { execFile, execFileSync } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

const { argv } = require('yargs')
  .usage('Usage: $0 [options]')
  .alias('r', 'remote')
  .nargs('r', 1)
  .example('$0 -r upstream/master', 'Set remote branch as upstream/master')
  .describe('r', 'remote branch defaults to origin/master')
  .alias('f', 'format')
  .nargs('f', 1)
  .example('$0 -f compact', 'Set report formatter as compact')
  .describe('f', 'formatter for lint report. Default to eslint default. If there is no matching formatter, fallback to default')
  .help('h')
  .alias('h', 'help')
  .epilog(`Made with ♥︎ by Kiddom Inc
copyright 2016-2017`);

// git base path
let basePath;
try {
  basePath = execFileSync('git', ['rev-parse', '--show-toplevel'], {
    encoding: 'utf8'
  }).trim();
} catch (e) {
  console.error(e.message);
  console.error('Failed to detect git root path');
  process.exit(-1);
}

const r = argv.r || 'origin/master';
const ruleCLI = new CLIEngine({
  // default is true, still for readability
  useEslintrc: true,
  extensions: ['js', 'jsx']
});

const filterFile = f =>
  f &&
  f.length > 0 &&
  ruleCLI.options.extensions.indexOf(path.extname(f).substr(1)) !== -1;

const fixReport = report => {
  report.errorCount += report.warningCount;
  report.warningCount = 0;
  const { results } = report;
  results.forEach(r => {
    r.errorCount += r.warningCount;
    r.warningCount = 0;
    r.messages.forEach(m => m.severity = 2);
  });
  return report;
};

execFile('git', ['diff', '--name-only', r], (error, out, err) => {
  if (error || err) {
    console.error(error || err);
    process.exit(-1);
  }

  // list of files to be processed
  const files = out
    .split('\n')
    .filter(filterFile)
    .map(n => path.join(basePath, n))
    .filter(existsSync);

  if (!files.length) {
  	process.exit(0);
  }

  const report = fixReport(ruleCLI.executeOnFiles(files));
  if (report.errorCount) {
    const formatter = ruleCLI.getFormatter(argv.f) || ruleCLI.getFormatter();
    console.log(formatter(report.results));
    process.exit(-1);
  }

  process.exit(0);
});
