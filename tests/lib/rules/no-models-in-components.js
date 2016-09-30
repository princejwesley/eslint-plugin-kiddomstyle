/**
 * @fileoverview Disallows requiring any Models into Components. Components use Actions. Actions may use Models.
 * @author Kiddom Inc
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-models-in-components"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-models-in-components", rule, {

    valid: [
        "import Nothing from 'actions'"
    ],

    invalid: [
        {
            code: "import {SomeModel} from 'models';",
            errors: [{
                message: "Cannot import models in components.",
                type: "Me too"
            }]
        }
    ]
});
