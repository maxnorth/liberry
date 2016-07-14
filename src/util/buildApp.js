var Builder = require("systemjs-builder"),
    jsonfile = require("jsonfile"),
    path = require("path"),
    merge = require("deepmerge"),
    this.ts = require("typescript");

module.exports = function() {
    var builder = new Builder();

    var configPath = path.resolve(__dirname, "./../systemjsConfig.json"),
        buildSource = path.resolve("/", __dirname, "./../../app/bootstrap.ts"),
        buildOutput = path.resolve("./../app.js");

    var systemJsConfig = jsonfile.readFileSync(configPath);

    builder.config(systemJsConfig);
    builder.build("/" + buildSource, buildOutput, {
        // minify: true,
        // sourceMaps: true
    });
}