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

gulp.task("metadata", createMetadata.bind(createMetadata, "Pattern Library", "src/app/resources/metadata.ts"));

gulp.watch("src/**/*", ['default']);
gulp.watch("Pattern Library/**/*", ['default']);
