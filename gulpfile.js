var gulp = require("gulp");
var clean = require("gulp-clean");
var Builder = require("systemjs-builder");
global.ts = require("typescript");
var jsonfile = require("jsonfile");

gulp.task("clean", function() {
     gulp.src("app.js", {read: false})
    .pipe(clean());
})

gulp.task("main", function() {
    var builder = new Builder();

    var configPath = "./src/util/systemjsConfig.json",
        buildSource = "./src/app/bootstrap.ts",
        buildOutput = "./dist/liberry.js";

    var systemJsConfig = jsonfile.readFileSync(configPath);

    builder.config(systemJsConfig);
    builder.buildStatic(buildSource, buildOutput, {
        globalDeps: {
            "liberry": "liberryData"
        }
    });
});

gulp.task("minify", function() {
    gulp.src(["node_module/"])
});

gulp.task("watch", function() {
    gulp.watch("src/**/*", ['default']);
    gulp.watch("Pattern Library/**/*", ['default']);
});
