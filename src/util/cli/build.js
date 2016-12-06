var _require = require("../../../_require"),
    Builder = require("systemjs-builder"),
    jsonfile = require("jsonfile"),
    path = require("path"),
    merge = require("deepmerge"),
    fs = require("fs"),
    gulp = require("gulp"),
    sass = require("gulp-sass"),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    config = _require("./src/util/config/get"),
    createLiberryData = _require("./src/util/createLiberryData"),
    browserRefresh = _require("./src/util/browser-refresh/server"),
    execSync = require("child_process").execSync;
    global.ts = require("typescript");


module.exports = function() {
    buildJS();
    buildCSS();

    browserRefresh.refresh();
}

function buildJS() {
    var resultPath = config.liberry._root + "/app/liberryApp.js";
    var srcPath = path.resolve(__dirname, "./../../../dist/liberry.js");
    var browserRefreshPath = path.resolve(__dirname, "./../browser-refresh/client.js");

    var liberryData;
    
    try {
        liberryData = createLiberryData(config.liberry._root);
    }
    catch (error) {
        console.error(error);
        liberryData = {};
    }

    var libDataBuffer = new Buffer(liberryData);

    var liberrySrcEncoded = fs.readFileSync(srcPath);

    var browserRefreshEncoded = fs.readFileSync(browserRefreshPath);

    var browserRefreshBuffer = new Buffer(browserRefreshEncoded);

    var liberrySrcBuffer = new Buffer(liberrySrcEncoded);

    var liberryUserAppBuffer = Buffer.concat([libDataBuffer, liberrySrcBuffer, browserRefreshBuffer]);

    fs.writeFileSync(resultPath, liberryUserAppBuffer);
}

function buildCSS() {

    runUserTasks(config.project._tasks);
    runUserTasks(config.liberry._tasks);

    gulpCss(config.liberry._css, "liberryApp.css");
    gulpCss(config.project._css, "liberryPatterns.css");
} 

function gulpCss(cssFiles, outputName) {
    gulp.src(cssFiles)
    .pipe(sass().on("error", sass.logError))
    .pipe(concat(outputName))
    .pipe(gulp.dest("app"));
}

function runUserTasks(tasks) {
    //TODO - use child_process.spawn(), recycle the same command line rather than create a new one
    var i;
    for (i in tasks) {
        var task = tasks[i];
        execSync(task.command, { cwd: task.path})
    }
}


function isString(subject) {
    return typeof subject === "string";
}
