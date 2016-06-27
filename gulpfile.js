var gulp = require("gulp");
var clean = require("gulp-clean");
var Builder = require("systemjs-builder");
global.ts = require("typescript");
createMetadata = require("./src/util/createMetadata");

gulp.task('default', ["clean", "metadata"], function() {

    var builder = new Builder();

    builder.config({
        packages: {
            'src': {
                //format: 'register',
                defaultExtension: 'ts'
            },
            'node_modules': {
                defaultExtension: 'js'
            },
            'lodash': {
                defaultExtension: 'js',
                main: 'lodash',
                format: 'cjs'
            }
        },
        paths: {
            'angular2/*': 'node_modules/angular2/*.js',
            'rxjs/*': 'node_modules/rxjs/*.js',
            'zone.js': 'node_modules/zone.js/dist/zone.js',
            'reflect-metadata': 'node_modules/reflect-metadata/Reflect.js',
            'crypto': 'node_modules/crypto/sha1.js',
            'app/*': 'src/app/*.ts',
            'symbol-observable': 'node_modules/symbol-observable/index.js',
            'lodash': 'node_modules/lodash',
            "prismjs": 'node_modules/prismjs/prism.js'
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
