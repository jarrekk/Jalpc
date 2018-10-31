module.exports = {
    CSSJSfiles: [{
        name: 'all page',
        quotefile: '_includes/index_head.html',
        prefix: 'app-',
        type: 'js',
        list: [
            'node_modules/jquery/dist/jquery.js',
            'static/js/bs3-typeahead.js',//
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/chart.js/dist/Chart.js',
            'node_modules/pace-progress/pace.js',
            'node_modules/wowjs/dist/wow.js',
            'static/js/scroll.js',
            'static/js/count.js'
        ]
    }, {
        name: 'i18next page',
        quotefile: '_includes/index_head.html',
        prefix: 'i18-',
        type: 'js',
        list: [
            'static/js/i18next.min.js',
            'static/js/localization.js'
        ]
    }, {
        name: 'blog pages',
        quotefile: '_includes/head.html',
        prefix: 'blog-',
        type: 'js',
        list: [
            'node_modules/metismenu/dist/metisMenu.js',
            'node_modules/jquery-slimscroll/jquery.slimscroll.js',
            'node_modules/peity/jquery.peity.js',
            'static/js/jPages.js',
            'static/js/js.js',
            'static/js/search.js'
        ]
    }, {
        name: 'all pages',
        quotefile: '_includes/head.html',
        prefix: 'app-',
        type: 'css',
        list: [
            'node_modules/normalize.css/normalize.css',
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/animate.css/animate.css',
            'node_modules/components-font-awesome/css/font-awesome.css',
            'node_modules/font-mfizz/dist/font-mfizz.css',
            'node_modules/gritter/jquery.gritter.css',
            'node_modules/pace-progress/themes/blue/pace-theme-flash.css',
        ]
    }]
}
