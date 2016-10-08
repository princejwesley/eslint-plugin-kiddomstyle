/**
 * @fileoverview Methods defined in files inside src/javascript/actions/ should not match onXXXX
 * (eg onClick..., onChange..., onSelect...)
 * Message: Action Creators are not event handlers. onClick/onChange names should only be used in mapStateToProps."
 * @author Kiddom Inc
 */
"use strict";

var MESSAGE = 'Action Creators are not event handlers. onClick/onChange ' +
  'names should only be used in mapStateToProps';
module.exports = {
  meta: {
    docs: {
      description: "Disallows event handlers in action creators",
      category: "Possible Errors",
      recommended: true
    },
    schema: []
  },
  create: function(context) {
    var EMITTER_ACTIONS = /on[A-Z].*/;
    var funMap = {};
    var propMap = {};

    return {
      FunctionDeclaration: function(node) {
        if (!node.id || !node.id.name) return;

        var name = node.id.name;
        funMap[name] = true;

        if (propMap[name]) {
          context.report({
            node: propMap[name],
            message: MESSAGE
          });
        }
      },
      AssignmentExpression: function(node) {
        var left = node.left;
        var right = node.right;

        if (!left.object || !left.property) return;

        if ((left.object.name === 'exports' || (
            left.object.object && left.object.property &&
            left.object.object.name === 'module' &&
            left.object.property.name === 'exports'
          )) &&
          EMITTER_ACTIONS.test(left.property.name)
        ) {
            // Function or alias ?
          var fun = right.type === 'ArrowFunctionExpression' ||
            right.type === 'FunctionExpression';

          if (fun) {
            context.report({
              node: node,
              message: MESSAGE
            });
          } else if (right.type === 'Identifier') {
            var bindingName = right.name;
            if (funMap[bindingName]) {
              context.report({
                node: node,
                message: MESSAGE
              });
            } else {
              propMap[bindingName] = node;
            }
          }
        }
      },
      Property: function(node) {
        if (!node.key || !node.key.name) return;
        var name = node.key.name;

        if (!EMITTER_ACTIONS.test(name)) return;

        var valType = node.value.type;
        if (valType !== 'ArrowFunctionExpression' &&
          valType !== 'FunctionExpression' &&
          valType !== 'Identifier')
          return;

        if (!(node.parent && node.parent.parent &&
            node.parent.parent.type === 'AssignmentExpression'))
          return;


        var left = node.parent.parent.left;

        var invalid = false;
        // exports = object assignment
        if (left.type === 'Identifier' && left.name === 'exports') {
          invalid = true;
        }
        // module.exports = object assignment
        else if (left.type === 'MemberExpression') {
          var modulePropName = left.object && left.object.name;
          var exportPropName = left.property && left.property.name

          if (modulePropName === 'module' &&
            exportPropName === 'exports') {
            invalid = true;
          }
        }

        if (!invalid) return;

        // For identifiers, build a look up table
        var bindingName = node.value.name;
        if (valType !== 'Identifier' || funMap[bindingName]) {
          context.report({
            node: node,
            message: MESSAGE
          });
        } else {
          propMap[bindingName] = node;
        }
      }
    };
  }
};
