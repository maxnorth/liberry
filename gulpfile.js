var gulp = require("gulp");
var clean = require("gulp-clean");
var Builder = require("systemjs-builder");
global.ts = require("typescript");
createMetadata = require("./src/util/createMetadata");
var jsonfile = require("jsonfile");

gulp.task("clean", function() {
     gulp.src("app.js", {read: false})
    .pipe(clean());
})

gulp.task("default", function() {
    var builder = new Builder();

    var configPath = "./src/util/systemjsConfig.json",
        buildSource = "./src/app/bootstrap.ts",
        buildOutput = "./src/bin/liberry-bundle.js";

    var systemJsConfig = jsonfile.readFileSync(configPath);

    builder.config(systemJsConfig);
    builder.bundle(buildSource, buildOutput, {
        // minify: true,
    });
});

gulp.task("watch", function() {
    gulp.watch("src/**/*", ['default']);
    gulp.watch("Pattern Library/**/*", ['default']);
});
