/**
 * @fileoverview Disallows requiring any Models into Components. Components use Actions. Actions may use Models.
 * @author Kiddom Inc
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Disallows requiring any Models into Components. Components use Actions. Actions may use Models.",
            category: "",
            recommended: true
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        function usedMemberSyntax(node) {
            if (node.specifiers.length === 0) {
                return "none";
            } else if (node.specifiers[0].type === "ImportNamespaceSpecifier") {
                return "all";
            } else if (node.specifiers[0].type === "ImportDefaultSpecifier") {
                return "single";
            } else {
                return "multiple";
            }
        }


        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            ImportDeclaration: function(node) {
                // Only check components
                if (!context.getFilename().match(/javascript\/components\//ig)) {
                    return;
                }

                // Only check imports of these types
                if (["single", "multiple"].indexOf(usedMemberSyntax(node)) === -1) {
                    return;
                }

                console.log("NODE", node.specifiers)

                // Are we importing a model into a component?
                if (node.specifiers[0].local.name.indexOf("Model")) {
                    context.report({
                        node: node,
                        message: "Use models from actions, not components."
                    });
                }
            }
        };
    }
};
