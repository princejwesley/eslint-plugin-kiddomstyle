"use strict";

var rule = require("../../../lib/rules/no-uppercase-filename.js"),
  RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("no-uppercase-filename", rule, {

  valid: [{
    code: 'var x = 1;',
    filename: "/Users/jordan/Code/eslint-for-kiddom/test.js"
  }],

  invalid: [{
    code: 'var x = 1;',
    filename: "/Users/jordan/Code/eslint-for-kiddom/Test.js",
    errors: [{
      message: "Prefer lowercase filename over uppercase",
      type: "Program"
    }]
  }]
});
