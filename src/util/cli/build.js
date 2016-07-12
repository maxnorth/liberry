var Builder = require("systemjs-builder"),
    jsonfile = require("jsonfile"),
    path = require("path"),
    merge = require("deepmerge"),
    createMetadata = require("./../createMetadata");
    global.ts = require("typescript"),
    liberryConfig = require("./../userConfig")

//console.log(liberryConfig);

module.exports = function() {
    createMetadata(liberryConfig.root, liberryConfig.root + "/bin/liberry-metadata.ts");
    buildApp();
}

function buildApp() {

    var builder = new Builder();

    var configPath = path.resolve(__dirname, "./../systemjsConfig.json"),
        buildSource = path.resolve("/", __dirname, "./../../app/bootstrap.ts"),
    	buildOutput = path.resolve(liberryConfig.root, "app.js");

    systemJsConfig = jsonfile.readFileSync(configPath);
    
    builder.config(systemJsConfig);
    builder.buildStatic("/" + buildSource, buildOutput, {
        // minify: true,
        // sourceMaps: true
    });
}