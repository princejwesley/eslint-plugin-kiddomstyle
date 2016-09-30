/**
 * @fileoverview This plugin enforces architectural choices within Kiddom&#39;s React-Redux code.
 * @author Kiddom Inc.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");

console.log("I AM INSIDE KIDDOMSTYLE");

module.exports.configs = {
  recommended: {
    rules: {
      'kiddomstyle/no-models-in-components': 2
    }
  }
};


console.log(module.exports);
