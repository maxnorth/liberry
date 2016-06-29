var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.use(express.static(__dirname + '/../../aispl-example'));

app.use(function(req, res) {
    res.sendFile(path.join(__dirname, '/../../aispl-example/index.html'));
});

app.listen(8080);