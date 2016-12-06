(function() {
    var request = new XMLHttpRequest(),
        send = sendRequest.bind(this, request);

    var attempts = 0;

    request.addEventListener("load", function(resEvent) {
        location.reload();
    });

    request.addEventListener("error", function(resEvent) {
        if (attempts <= 5) {
            setTimeout(send, 2000);
        }
    });

    send();

    function sendRequest(request) {
        request.open("POST", "/BrowserRefresh");
        request.send();
        attempts++;
    }
})();