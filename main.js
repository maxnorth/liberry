//module delivered by require("liberry"), exposes the cli as JS functions
var exports = {};

exports.build = require("./src/util/cli/build"),
exports.serve = require("./src/util/cli/serve"),
exports.watch = require("./src/util/cli/watch"),
exports.dev = require("./src/util/cli/dev");

module.exports = exports;