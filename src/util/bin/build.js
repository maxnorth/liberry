var Builder = require("systemjs-builder");
var jsonfile = require("jsonfile");
global.ts = require("typescript");

module.exports = function() {
    var builder = new Builder();
    systemJsConfig = jsonfile.readFileSync("./src/util/config/systemjs-config.json");
    console.log(systemJsConfig);
    
    builder.config(systemJsConfig);

    builder.buildStatic("./src/app/bootstrap.ts", "app.js", {
        // minify: true,
        // sourceMaps: true
    });
}