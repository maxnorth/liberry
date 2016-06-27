var Builder = require("systemjs-builder");
var jsonfile = require("jsonfile");
global.ts = require("typescript");

module.exports = function() {
    var builder = new Builder();

    var configPath = path.resolve(__dirname, "./src/util/config/systemjs-config.json");
    systemJsConfig = jsonfile.readFileSync(configPath);
    console.log(systemJsConfig);
    
    builder.config(systemJsConfig);

    builder.buildStatic("./src/app/bootstrap.ts", "app.js", {
        // minify: true,
        // sourceMaps: true
    });
}