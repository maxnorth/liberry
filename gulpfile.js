var gulp = require("gulp");
var clean = require("gulp-clean");
var Builder = require("systemjs-builder");
global.ts = require("typescript");
createMetadata = require("./module/build/createMetadata");

gulp.task('default', ["clean", "metadata"], function() {

    var builder = new Builder();

    builder.config({
        packages: {
          'module': {
            //format: 'register',
            defaultExtension: 'ts'
          },
          'node_modules': {
              defaultExtension: 'js'
          }
        },
        paths: {
            'angular2/*': 'node_modules/angular2/*.js',
            'rxjs/*': 'node_modules/rxjs/*.js',
            'zone.js': 'node_modules/zone.js/dist/zone.js',
            'reflect-metadata': 'node_modules/reflect-metadata/Reflect.js',
            'crypto': 'node_modules/crypto/sha1.js',
            'app/*': 'module/app/*.ts',
            'symbol-observable': 'node_modules/symbol-observable/index.js'
        },
        transpiler: 'typescript',
        typescriptOptions: {
            emitDecoratorMetadata: true,
            experimentalDecorators: true
        },
        map: {
          //"app/resources/metadata": "app/metadata"
        }
    });

    builder.buildStatic("module/app/bootstrap.ts", "app.js", {
        // minify: true,
        // sourceMaps: true
    });
});

gulp.task("clean", function() {
     gulp.src("app.j*", {read: false})
    .pipe(clean());
})

gulp.task("metadata", createMetadata.bind(createMetadata, "ExampleStructure", "module/app/resources/metadata.ts"));

gulp.watch("module/**/*", ['default']);
gulp.watch("ExampleStructure/**/*", ['default']);
