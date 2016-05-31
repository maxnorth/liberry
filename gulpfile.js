var gulp = require("gulp");
var clean = require("gulp-clean");
var Builder = require("systemjs-builder");
global.ts = require("typescript");

gulp.task('default', ["clean"], function() {
    
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

gulp.watch("module/**/*", ['default']);
