$(document).ready(function() {
    pre_content = $("#jalpc_site_pv").html();
    $("#jalpc_site_pv").html(pre_content);
    $.ajax({
        type: "get",
        async: false,
        url: "http://jalpc-a.leanapp.cn/api/jalpc_count",
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "flightHandler",
        success: function(json) {
            var website_count = json.count;
            $("#jalpc_site_pv").html('<span class="navy">' + website_count + '</span>&nbsp;<span data-i18n="link.view">views</span>&nbsp;||&nbsp;' + pre_content);
        },
        error: function() {
            console.log('fail');
        }
    });
});
