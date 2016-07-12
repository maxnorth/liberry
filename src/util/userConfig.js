var jsonfile = require("jsonfile");
var merge = require("deepmerge");

var liberryConfig; 

try {
    liberryConfig = jsonfile.readFileSync("./$liberry.json");
} catch (exception) {
    liberryConfig = {};
}

var defaultConfig = {
    "root": "./"
};

module.exports = merge(defaultConfig, liberryConfig);