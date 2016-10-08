"use strict";

var rule = require("../../../lib/rules/no-redundant-functions.js"),
  RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  ecmaFeatures: {
    modules: true,
    jsx: true
  },
});

var ruleTester = new RuleTester();
ruleTester.run("no-redundant-functions", rule, {

  valid: [{
    code: 'const searchContentLibrary = () => {}',
    filename: "/Users/jordan/Code/eslint-for-kiddom/test.js"
  }, {
    code: 'const searchContentLibrary = function() { }',
    filename: "/Users/jordan/Code/eslint-for-kiddom/test.js"
  }, {
    code: 'const searchContentLibrary = () => { var x = 10; return x; }',
    filename: "/Users/jordan/Code/eslint-for-kiddom/test.js"
  }, {
    code: 'const searchContentLibrary = () => { return 10; }',
    filename: "/Users/jordan/Code/eslint-for-kiddom/test.js"
  }, {
    code: 'const searchContentLibrary = () => { return; }',
    filename: "/Users/jordan/Code/eslint-for-kiddom/test.js"
  }, {
    code: 'function searchContentLibrary() { return; }',
    filename: "/Users/jordan/Code/eslint-for-kiddom/test.js"
  }, {
    code: 'function searchContentLibrary() { return 10; }',
    filename: "/Users/jordan/Code/eslint-for-kiddom/test.js"
  }, {
    code: 'function searchContentLibrary() { var x = 10; return x; }',
    filename: "/Users/jordan/Code/eslint-for-kiddom/test.js"
  }, {
    code: '<div onClick={searchContentLibrary}>test jsx</div>',
    filename: "/Users/jordan/Code/eslint-for-kiddom/test.js"
  }, {
    code: '<div onClick={(e) => { return searchContentLibrary("prefix") }}>test jsx</div>',
    filename: "/Users/jordan/Code/eslint-for-kiddom/test.js"
  }],

  invalid: [{
    code: 'const searchContentLibrary = () => { openSearchContentLibrary(); }',
    filename: "/Users/jordan/Code/eslint-for-kiddom/Test.js",
    errors: [{
      message: "searchContentLibrary exists only to call openSearchContentLibrary" +
               " Why not use openSearchContentLibrary directly, instead?",
      type: "VariableDeclarator"
    }]
  }, {
    code: 'const searchContentLibrary = () => { return openSearchContentLibrary(); }',
    filename: "/Users/jordan/Code/eslint-for-kiddom/Test.js",
    errors: [{
      message: "searchContentLibrary exists only to call openSearchContentLibrary" +
               " Why not use openSearchContentLibrary directly, instead?",
      type: "VariableDeclarator"
    }]
  }, {
    code: 'function searchContentLibrary() { openSearchContentLibrary(); }',
    filename: "/Users/jordan/Code/eslint-for-kiddom/Test.js",
    errors: [{
      message: "searchContentLibrary exists only to call openSearchContentLibrary" +
               " Why not use openSearchContentLibrary directly, instead?",
      type: "FunctionDeclaration"
    }]
  }, {
    code: 'function searchContentLibrary() { return openSearchContentLibrary(); }',
    filename: "/Users/jordan/Code/eslint-for-kiddom/Test.js",
    errors: [{
      message: "searchContentLibrary exists only to call openSearchContentLibrary" +
               " Why not use openSearchContentLibrary directly, instead?",
      type: "FunctionDeclaration"
    }]
  }, {
    code: '<div onClick={() => searchContentLibrary()}>test jsx</div>',
    output: '<div onClick={searchContentLibrary}>test jsx</div>',
    filename: "/Users/jordan/Code/eslint-for-kiddom/Test.js",
    errors: [{
      message: "searchContentLibrary can be called directly without wrapping" +
               " with anonymous function in JSXAttribute: onClick",
      type: "CallExpression"
    }]
  }, {
    code: '<div onClick={() => { return searchContentLibrary() }}>test jsx</div>',
    output: '<div onClick={searchContentLibrary}>test jsx</div>',
    filename: "/Users/jordan/Code/eslint-for-kiddom/Test.js",
    errors: [{
      message: "searchContentLibrary can be called directly without wrapping" +
               " with anonymous function in JSXAttribute: onClick",
      type: "CallExpression"
    }]
  }, {
    code: '<div onClick={(e) => { return searchContentLibrary(e) }}>test jsx</div>',
    output: '<div onClick={searchContentLibrary}>test jsx</div>',
    filename: "/Users/jordan/Code/eslint-for-kiddom/Test.js",
    errors: [{
      message: "searchContentLibrary can be called directly without wrapping" +
               " with anonymous function in JSXAttribute: onClick",
      type: "CallExpression"
    }]
  }]
});
