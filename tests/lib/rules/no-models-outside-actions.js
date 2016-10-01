"use strict";

var rule = require("../../../lib/rules/no-models-outside-actions.js"),
  RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  ecmaFeatures: {
    modules: true,
  },
});

var ruleTester = new RuleTester();

ruleTester.run("no-models-outside-actions", rule, {

  valid: [{
    code: 'import MyModel from "./src/models/MyModel.js"',
    filename: "./src/actions/test.js"
  }, {
    code: 'var MyModel = require("./src/models/MyModel.js")',
    filename: "./src/actions/test.js"
  }, {
    code: 'var PI= Math.PI, loc, model = require("./src/models/MyModel.js")',
    filename: "./src/actions/test.js"
  }],

  invalid: [{
    code: 'import MyModel from "./src/models/MyModel.js"',
    filename: "./src/components/srcTest.js",
    errors: [{
      message: "Import/require models outside actions are not allowed",
      type: "ImportDeclaration"
    }]
  }, {
    code: 'var MyModel = require("./src/models/MyModel.js")',
    filename: "./src/components/srcTest.js",
    errors: [{
      message: "Import/require models outside actions are not allowed",
      type: "VariableDeclaration"
    }]
  }, {
    code: 'var PI= Math.PI, loc, model = require("./src/models/MyModel.js")',
    filename: "./src/components/srcTest.js",
    errors: [{
      message: "Import/require models outside actions are not allowed",
      type: "VariableDeclaration"
    }]
  }]
});

