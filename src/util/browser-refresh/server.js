//custom express middleware function
var responses = [];

module.exports = function AutoRefresh(req, res, next) {
    responses.push(res);
};

module.exports.refresh = function() {
    while (responses.length) {
        responses.pop().send();
    }
}

module.exports.url = "/BrowserRefresh";