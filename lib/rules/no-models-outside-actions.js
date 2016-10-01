/**
 * @fileoverview Disallows models imports outside actions.
 * @author Kiddom Inc
 */

"use strict";

module.exports = {
  meta: {
    docs: {
      description: "disallow model imports outside actions",
      category: "Possible Errors",
      recommended: true
    },
    schema: []
  },
  create: function(context) {
    var ACTIONS = /\bactions\//;
    var MODELS = /\bmodels\//;

    // disallow models inside actions
    function disallowModelsRule(context, node, meta) {
      if (!ACTIONS.test(meta.filename) &&
        MODELS.test(meta.code)) {
        context.report({
          node: node,
          message: 'Import/require models outside actions are not allowed',
          loc: meta.loc
        });
      }
    }

    return {
      ImportDeclaration: function(node) {
        var code = node.source.raw;
        var filename = context.getFilename();
        disallowModelsRule(context, node, {
          filename: filename,
          code: code
        });
      },
      VariableDeclaration: function(node) {
        node.declarations.forEach(function(declaration) {
          if (declaration.init && declaration.init.callee &&
            declaration.init.callee.type === 'Identifier' &&
            declaration.init.callee.name === 'require') {
            var arg = declaration.init.arguments[0];
            var filename = context.getFilename();
            disallowModelsRule(context, node, {
              filename: filename,
              code: arg.raw,
              loc: arg.loc
            });
          }
        });
      }
    };
  }
};
