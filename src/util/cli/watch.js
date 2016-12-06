var _require = require("../../../_require"),
    build = require("./build"),
    gulp = require("gulp"),
    config = _require("./src/util/config/get");

module.exports = function() {
    var watchGlobs = config.liberry._watch.concat(config.project._watch);

    //exclude output location from being watched
    watchGlobs.push("!" + config.liberry._root + "/app/**");

    var buildNumber = 0,
        building = false;
    gulp.watch(watchGlobs, function() {
        if (!building) {
            building = true;
            buildNumber += 1;
            console.log("Starting build " + buildNumber + "...");
            build();
            console.log("Build " + buildNumber + " finished.");
            setTimeout(function() {
                //TODO - kinda hacky, should be a more deterministic way to manage this. watch files manually?
                building = false;
            }, 500);
        }
    });
};