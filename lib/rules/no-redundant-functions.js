/**
 * @fileoverview No method should ever be defined which solely exists to call another method.
 * (no-redundant-function)
 * Anonymous arrow functions calling another function should be cleaned up automatically.
 * We see this a lot when passing callbacks into JSX attributes.
 *   eg onClick={() => searchContentLibrary()} should be auto-fixed to `onClick=>{searchContentLibrary}.
 * Non-anonymous functions should throw a warning, but not autofix:
 *   const searchContentLibrary = () => { openSearchContentLibrary(); }
 * should throw the warning "searchContentLibrary exists only to call openSearchContentLibrary.
 * Why not use openSearchContentLibrary directly, instead?"
 * @author Kiddom Inc
 */
"use strict";

module.exports = {
  meta: {
    docs: {
      description: "Disallows methods which solely exists to call another method",
      category: "Possible Errors",
      fixable: 'code',
      recommended: true
    },
    schema: []
  },
  create: function(context) {

    function nonAnonymousCase(node, body) {
      var body = body && body.body;
      if (!body || body.length !== 1) return;

      var statement = body[0];

      if (statement.type !== 'ExpressionStatement' &&
        statement.type !== 'ReturnStatement')
        return;

      var callStatement = statement.expression || statement.argument;

      if (callStatement && callStatement.type === 'CallExpression') {
        context.report({
          node: node,
          message: nonAnonymousErrorMessage(node.id.name, callStatement.callee.name)
        });
      }
    }

    function nonAnonymousErrorMessage(left, right) {
      return left + ' exists only to call ' + right +
        ' Why not use ' + right + ' directly, instead?';
    }

    function jsxAnonymousErrorMessage(left, right) {
      return left + ' can be called directly without wrapping with' +
        ' anonymous function in JSXAttribute: ' + right;
    }

    function byName(o) {
      return o && o.name;
    }

    function isFixable(expression, callExpression) {
      var arrowParamNames = expression.params.map(byName);
      var callParamNames = callExpression.arguments.map(byName);
      if (callParamNames.length > arrowParamNames.length)
        return false;

      return arrowParamNames.every(function (name, idx) {
        return callParamNames.length <= idx || (callParamNames[idx] === name);
      });
    }

    return {
      FunctionDeclaration: function(node) {
        nonAnonymousCase(node, node.body);
      },
      VariableDeclaration: function(node) {
        node.declarations.forEach(function(declaration) {
          var init = declaration.init;
          if (!init) return;

          var type = init.type;
          if (type !== 'ArrowFunctionExpression' &&
            type !== 'FunctionExpression')
            return;

          nonAnonymousCase(declaration, init.body);
        });
      },
      JSXAttribute: function(node) {
        var value = node.value;

        if (!value || value.type !== 'JSXExpressionContainer')
          return;

        var expression = value.expression;

        if (!expression || expression.type !== 'ArrowFunctionExpression')
          return;

        var body = expression.body;

        var callExpression;
        if (body.type === 'CallExpression') {
          callExpression = body;
        } else if (body.type === 'BlockStatement') {
          body = body.body;
          if (!body || body.length !== 1) return;

          var statement = body[0];
          if (statement.type !== 'ReturnStatement') return;
          callExpression = statement.argument;
        }

        if (!callExpression || !isFixable(expression, callExpression)) return;

        context.report({
          node: callExpression,
          message: jsxAnonymousErrorMessage(callExpression.callee.name, node.name.name),
          fix: function(fixer) {
            return {
              range: expression.range,
              text: callExpression.callee.name
            };
          }
        });
      },
    };
  }
};
