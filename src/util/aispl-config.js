var jsonfile = require("jsonfile");
var merge = require("deepmerge");

var aisplConfig; 

try {
    aisplConfig = jsonfile.readFileSync("./aispl-config.json");
} catch (exception) {
    aisplConfig = {};
}

var defaultConfig = {
    "root": "./"
};

module.exports = merge(defaultConfig, aisplConfig);