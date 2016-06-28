var Builder = require("systemjs-builder"),
    jsonfile = require("jsonfile"),
    path = require("path"),
    merge = require("deepmerge"),
    createMetadata = require("./../createMetadata");
    global.ts = require("typescript"),
    aisplConfig = require("./../aispl-config")

console.log(aisplConfig);

module.exports = function() {
    createMetadata(aisplConfig.root, aisplConfig.root + "/bin/aispl-metadata.ts");
    buildApp();
}

function buildApp() {

    var builder = new Builder();

    var configPath = path.resolve(__dirname, "./../config/systemjs-config.json"),
        buildSource = path.resolve("/", __dirname, "./../../app/bootstrap.ts"),
    	buildOutput = path.resolve(buildConfig.outputLocation, buildConfig.appName);

    systemJsConfig = jsonfile.readFileSync(configPath);
    
    builder.config(systemJsConfig);
    builder.buildStatic("/" + buildSource, buildOutput, {
        // minify: true,
        // sourceMaps: true
    });
}
var specConfig = {

};

var buildConfig = {
    outputLocation: specConfig.whatever || "./",
    appName: specConfig.name || "app.js"
};