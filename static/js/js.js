$(function(){

    /* build and append preformated code examples */
    $("div#content").find("p").last().after(buildCodeBlocks);

    /* toggle/collapse preformated code blocks */
    $("pre").bind("click", function(){
        this.className = this.className.indexOf("collapse") === -1 ?
            ( "collapse " + this.className ) : this.className.replace("collapse ", "");
    });
    
    /* apply code highlight */
    $('pre code').each( function(i, e) {
        hljs.highlightBlock(e, '    ');
    });

});

function buildCodeBlocks() {
    return "<div class='codeBlocks clearfix'>" +
    "<pre class='html'><code>" + getHtml() + "</code></pre>" +
    "<pre class='javascript'><code>" + cleanJson( $("head script").last().text() ) + "</code></pre>" +
    "<pre class='css'><code>" + cleanCSS( $("head style").text() ) + "</code></pre>" +
    "</div>";
}


function getHtml() {
    var clone, ul, li, code;

    clone = $("<div />").append($("div#content").contents().not("h2, p").clone());
    ul = clone.find("ul");
    li = ul.find("li");

    li.slice(3, li.length).remove();
    ul.append("...");

    code = clone.html();

    return cleanHTML(code).replace(/</gi, "&lt;").replace(/>/gi, "&gt;");;
    //code = $.tabifier(code, "HTML").replace(/</gi, "&lt;").replace(/>/gi, "&gt;");

}
