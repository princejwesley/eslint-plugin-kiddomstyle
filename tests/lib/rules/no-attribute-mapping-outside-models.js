"use strict";

var rule = require("../../../lib/rules/no-attribute-mapping-outside-models.js"),
  RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  ecmaFeatures: {
    modules: true,
  },
});

var ruleTester = new RuleTester();

ruleTester.run("no-attribute-mapping-outside-models", rule, {

  valid: [{
    code: 'import MyModel from "./src/models/attribute_mappings/MyModel.js"',
    filename: "./src/models/test.js"
  }, {
    code: 'var MyModel = require("./src/models/MyModel.js")',
    filename: "./src/models/test.js"
  }, {
    code: 'var PI= Math.PI, loc, model = require("./src/models/attribute_mappings/MyModel.js")',
    filename: "./src/models/test.js"
  }],

  invalid: [{
    code: 'import MyModel from "./src/models/attribute_mappings/MyModel.js"',
    filename: "./src/components/srcTest.js",
    errors: [{
      message: "models/attribute_mappings should be used inside models",
      type: "ImportDeclaration"
    }]
  }, {
    code: 'var MyModel = require("./src/models/attribute_mappings/MyModel.js")',
    filename: "./src/components/srcTest.js",
    errors: [{
      message: "models/attribute_mappings should be used inside models",
      type: "VariableDeclaration"
    }]
  }, {
    code: 'var PI= Math.PI, loc, model = require("./src/models/attribute_mappings/MyModel.js")',
    filename: "./src/components/srcTest.js",
    errors: [{
      message: "models/attribute_mappings should be used inside models",
      type: "VariableDeclaration"
    }]
  }]
});

