#! /usr/bin/env node
var argv = require("minimist")(process.argv.slice(2));
var build = require("./bin/build");

Object.keys(argv).forEach((item) => console.log(item));

if (argv.hasOwnProperty("build")) build();