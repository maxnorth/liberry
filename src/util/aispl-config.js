var jsonfile = require("jsonfile");
var merge = require("deepmerge");

var aisplConfig = jsonfile.readFileSync("./aispl-config.json");

var defaultConfig = {

};

module.exports = merge(defaultConfig, aisplConfig);