#! /usr/bin/env node
var argv = require("minimist")(process.argv.slice(2)),
    cmd = commands(argv._)
	build = require("./src/util/cli/build"),
    serve = require("./src/util/cli/serve"),
    watch = require("./src/util/cli/watch"),
    dev = require("./src/util/cli/dev");

//cli controller
if (cmd.build) build();
else if (cmd.serve) serve();
else if (cmd.watch) watch();
else if (cmd.dev) dev();


//utilities
function commands(array) {
    var cmd = {};

    if ((typeof array === "object") && array.length) {
        array.forEach((key) => cmd[key] = true);
    }
    return cmd;
}