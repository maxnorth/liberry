var express = require('express');
var app = express();
var path = require('path');
var aisplConfig = require("./../aispl-config");

module.exports = function() {
    // viewed at http://localhost:8080
    var staticServeRoot = path.resolve("./", aisplConfig.root),
        indexLocation = path.resolve("./", aisplConfig.root, './index.html').slice(3);

    app.use(express.static(staticServeRoot));


    app.use(function(req, res) {
        res.sendFile("/" + indexLocation);
    });

    app.listen(process.env.port);
}