var build = require("./build"),
    watch = require("./watch"),
    serve = require("./serve"),
    opener = require("opener");

module.exports = function() {
    build();
    watch();
    var port = serve();
    //open browser
    opener("http://localhost:" + port);
}