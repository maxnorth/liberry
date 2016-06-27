#! /usr/bin/env node
var argv = require("minimist")(process.argv.slice(2));
var build = require("./bin/build");

if (argv.hasOwnProperty("build")) build();