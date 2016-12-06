var _require = require("../../../_require");
var express = require('express');
var app = express();
var path = require('path');
var config = _require("./src/util/config/get");
var browserRefresh = _require("./src/util/browser-refresh/server");

module.exports = function() {
    // viewed at http://localhost:8080
    var staticServeRoot = path.resolve(config.liberry._root + "/app"),
        indexLocation = path.resolve(config.liberry._root, './app/index.html').slice(3);

    app.post(browserRefresh.url, browserRefresh);

    app.use(express.static(staticServeRoot));

    app.use(function(req, res) {
        if (req.path.indexOf("/") > req.path.indexOf(".")) {
            res.sendFile("/" + indexLocation);
        }
        else {
            res.status(404).send();
        }
    });

    var port = process.env.PORT || 8080;
    app.listen(port);

    console.log("Serving site on port " + port);

    return port;
}