/**
 * @fileoverview Disallows uppercase filenames.
 * @author Kiddom Inc
 */

"use strict";
var path = require('path');

module.exports = {
  meta: {
    docs: {
      description: "disallow uppercase filename",
      category: "Possible Errors",
      recommended: true
    },
    schema: []
  },
  create: function(context) {

    var UPPERCASE = /[A-Z]/;

    return {
      Program: function(node) {
        var filename = path.basename(context.getFilename());

        if (UPPERCASE.test(filename)) {
          context.report({
            node: node,
            message: 'Prefer lowercase filename over uppercase'
          });
        }
      }
    };
  }
};
