var gulp = require("gulp");
var clean = require("gulp-clean");
var Builder = require("systemjs-builder");
global.ts = require("typescript");
createMetadata = require("./src/util/createMetadata");
var jsonfile = require("jsonfile");

gulp.task('default', ["clean", "metadata"], function() {

    var builder = new Builder(),
    systemJsConfig = jsonfile.readFileSync("./config/systemjs-config.json");
    
    builder.config(systemJsConfig);

    builder.buildStatic("src/app/bootstrap.ts", "app.js", {
        // minify: true,
        // sourceMaps: true
    });
});

gulp.task("clean", function() {
     gulp.src("app.j*", {read: false})
    .pipe(clean());
})

gulp.task("metadata", createMetadata.bind(createMetadata, "Pattern Library", "src/app/resources/metadata.ts"));

gulp.watch("src/**/*", ['default']);
gulp.watch("Pattern Library/**/*", ['default']);
