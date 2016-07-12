var express = require('express');
var app = express();
var path = require('path');
var liberryConfig = require("./../userConfig");

module.exports = function() {
    // viewed at http://localhost:8080
    var staticServeRoot = path.resolve("./", liberryConfig.root),
        indexLocation = path.resolve("./", liberryConfig.root, './index.html').slice(3);

    app.use(express.static(staticServeRoot));


    app.use(function(req, res) {
        res.sendFile("/" + indexLocation);
    });

    app.listen(process.env.PORT || 8080);
}