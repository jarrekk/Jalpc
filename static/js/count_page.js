$(document).ready(function() {
    $.ajax({
        type: "get",
        async: false,
        url: "http://jalpc-a.leanapp.cn/api/jalpc_count",
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "flightHandler",
        success: function(json) {
            console.log('success');
        },
        error: function() {
            console.log('error');
        }
    });
});
