/**
 * @fileoverview Disallows models/attribute_mappings imports outside models.
 * @author Kiddom Inc
 */

"use strict";

module.exports = {
  meta: {
    docs: {
      description: "disallow models/attribute_mappings outside models",
      category: "Possible Errors",
      recommended: true
    },
    schema: []
  },
  create: function(context) {
    var ACTIONS = /\bactions\//;
    var MODELS_ATTRIBUTE_MAPPING = /\bmodels\/attribute_mappings\//;
    var MODELS = /\bmodels\//;

    // disallow models/attribute_mappings ouside module
    function disallowModelAttrMapRule(context, node, meta) {
      if (!MODELS.test(meta.filename) &&
        MODELS_ATTRIBUTE_MAPPING.test(meta.code)) {
        context.report({
          node: node,
          message: 'models/attribute_mappings should be used inside models',
          loc: meta.loc
        });
      }
    }

    return {
      ImportDeclaration: function(node) {
        var code = node.source.raw;
        var filename = context.getFilename();
        disallowModelAttrMapRule(context, node, {
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
            disallowModelAttrMapRule(context, node, {
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
