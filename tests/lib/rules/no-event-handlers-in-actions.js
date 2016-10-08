"use strict";

var rule = require("../../../lib/rules/no-event-handlers-in-actions.js"),
  RuleTester = require("eslint").RuleTester;

var fs = require('fs'),
  path = require('path');

var ruleTester = new RuleTester();

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  ecmaFeatures: {
    modules: true,
    es6: true
  },
});

ruleTester.run("no-event-handlers-in-actions", rule, {

  valid: [{
    code: 'exports.createData = () => {}',
    filename: "/Users/jordan/Code/eslint-for-kiddom/test.js"
  }, {
    code: 'const onCreateData = () => {}',
    filename: "/Users/jordan/Code/eslint-for-kiddom/test.js"
  }, {
    code: 'module.exports = {' +
      ' createData: () => {}' +
      '}',
    filename: "/Users/jordan/Code/eslint-for-kiddom/test.js"
  }, {
    code: 'some.data = {' +
      ' onCreateData: () => {}' +
      '}',
    filename: "/Users/jordan/Code/eslint-for-kiddom/test.js"
  }],

  invalid: [{
    code: 'exports.onCreateData = () => {}',
    filename: "/Users/jordan/Code/eslint-for-kiddom/Test.js",
    errors: [{
      message: "Action Creators are not event handlers. onClick/onChange " +
        "names should only be used in mapStateToProps",
      type: "AssignmentExpression"
    }]
  }, {
    code: 'exports = { onCreateData : () => {} }',
    filename: "/Users/jordan/Code/eslint-for-kiddom/Test.js",
    errors: [{
      message: "Action Creators are not event handlers. onClick/onChange " +
        "names should only be used in mapStateToProps",
      type: "Property"
    }]
  }, {
    code: 'module.exports.onCreateData = () => {}',
    filename: "/Users/jordan/Code/eslint-for-kiddom/Test.js",
    errors: [{
      message: "Action Creators are not event handlers. onClick/onChange " +
        "names should only be used in mapStateToProps",
      type: "AssignmentExpression"
    }]
  }, {
    code: 'module.exports = {' +
      ' onCreateData: () => {}' +
      '}',
    filename: "/Users/jordan/Code/eslint-for-kiddom/Test.js",
    errors: [{
      message: "Action Creators are not event handlers. onClick/onChange " +
        "names should only be used in mapStateToProps",
      type: "Property"
    }]
  }, {
    code: 'module.exports = {' +
      ' onClick: myTestFunction' +
      '};\n' +
      'function myTestFunction() {}',
    filename: "/Users/jordan/Code/eslint-for-kiddom/Test.js",
    errors: [{
      message: "Action Creators are not event handlers. onClick/onChange " +
        "names should only be used in mapStateToProps",
      type: "Property"
    }]
  }]
});
