var UglifyJS = require('uglify-js');
var CleanCSS = require('clean-css');
var fs = require('fs');

nowDate = new Date();
nowDateStr = nowDate.toISOString().slice(0,10).replace(/-/g,"");


// compress js files of index page
indexJsFilename = 'app-index-' + nowDateStr + '.min.js'
console.log('Now compress index page js files to ' + indexJsFilename + ' ...')
var result = UglifyJS.minify([
	'node_modules/jquery/dist/jquery.js',
	'node_modules/bootstrap/dist/js/bootstrap.js',
	'node_modules/pace-progress/pace.js',
	'node_modules/wowjs/dist/wow.js',
	'static/js/scroll.js',
	'static/js/count.js'
	], {
	mangle: true,
	compress: {
		sequences: true,
		dead_code: true,
		conditionals: true,
		booleans: true,
		unused: true,
		if_return: true,
		join_vars: true,
		drop_console: true
	},
});

fs.writeFileSync('static/assets/' + indexJsFilename, result.code);
console.log('Index page js files compress succeed. You can find it at "static/assets".\n');


// compress css files of index page
indexCSSFilename = 'app-index-' + nowDateStr + '.min.css'
console.log('Now compress index page css files to ' + indexCSSFilename + ' ...')
var result = new CleanCSS().minify([
	'node_modules/normalize.css/normalize.css',
	'node_modules/bootstrap/dist/css/bootstrap.css',
	'node_modules/animate.css/animate.css',
	'node_modules/components-font-awesome/css/font-awesome.css',
	'node_modules/font-mfizz/dist/font-mfizz.css'
	]
);

var output = new CleanCSS({
  	level: {
		1: {
	   		transform: function (propertyName, propertyValue) {
	        	if (propertyName == 'src' && propertyValue.indexOf('node_modules/bootstrap/dist/') > -1) {
	          		return propertyValue.replace('node_modules/bootstrap/dist/', '');
	        	}
	        	if (propertyName == 'src' && propertyValue.indexOf('node_modules/components-font-awesome/') > -1) {
	          		return propertyValue.replace('node_modules/components-font-awesome/', '');
	        	}
	        	if (propertyName == 'src' && propertyValue.indexOf('node_modules/font-mfizz/dist/') > -1) {
	          		return propertyValue.replace('node_modules/font-mfizz/dist/', '');
	        	}
	      	}
	   	}
  	}
}).minify(result.styles);

fs.writeFileSync('static/assets/' + indexCSSFilename, output.styles);
console.log('Index page css files compress succeed. You can find it at "static/assets".\n');


// compress js file of other pages--1
blogJsFilename1 = 'app-' + nowDateStr + '-1.min.js'
console.log('Now compress index page js files to ' + blogJsFilename1 + ' ...')
var result = UglifyJS.minify([
	'node_modules/jquery/dist/jquery.js',
	'search/js/bootstrap3-typeahead.min.js'
	], {
	mangle: true,
	compress: {
		sequences: true,
		dead_code: true,
		conditionals: true,
		booleans: true,
		unused: true,
		if_return: true,
		join_vars: true,
		drop_console: true
	},
});

fs.writeFileSync('static/assets/' + blogJsFilename1, result.code);
console.log('Index page js files compress succeed. You can find it at "static/assets".\n');


// compress js file of other pages--2
blogJsFilename2 = 'app-' + nowDateStr + '-2.min.js'
console.log('Now compress index page js files to ' + blogJsFilename2 + ' ...')
var result = UglifyJS.minify([
	'node_modules/bootstrap/dist/js/bootstrap.js',
	'node_modules/metismenu/dist/metisMenu.js',
	'node_modules/jquery-slimscroll/jquery.slimscroll.js',
	'node_modules/peity/jquery.peity.js',
	'node_modules/pace-progress/pace.js',
	'node_modules/wowjs/dist/wow.js',
	'static/js/scroll.js',
	'static/js/count.js'
	], {
	mangle: true,
	compress: {
		sequences: true,
		dead_code: true,
		conditionals: true,
		booleans: true,
		unused: true,
		if_return: true,
		join_vars: true,
		drop_console: true
	},
});

fs.writeFileSync('static/assets/' + blogJsFilename2, result.code);
console.log('Index page js files compress succeed. You can find it at "static/assets".\n');


// compress css files of index page
blogCSSFilename = 'app-' + nowDateStr + '.min.css'
console.log('Now compress other pages css files to ' + blogCSSFilename + ' ...')
var result = new CleanCSS().minify([
	'node_modules/normalize.css/normalize.css',
	'node_modules/bootstrap/dist/css/bootstrap.css',
	'node_modules/animate.css/animate.css',
	'node_modules/components-font-awesome/css/font-awesome.css',
	'node_modules/font-mfizz/dist/font-mfizz.css',
	'node_modules/gritter/jquery.gritter.css',
	'search/css/cb-search.css',
	'static/css/pygments.css'
	]
);

var output = new CleanCSS({
  	level: {
		1: {
	   		transform: function (propertyName, propertyValue) {
	        	if (propertyName == 'src' && propertyValue.indexOf('node_modules/bootstrap/dist/') > -1) {
	          		return propertyValue.replace('node_modules/bootstrap/dist/', '');
	        	}
	        	if (propertyName == 'src' && propertyValue.indexOf('node_modules/components-font-awesome/') > -1) {
	          		return propertyValue.replace('node_modules/components-font-awesome/', '');
	        	}
	        	if (propertyName == 'src' && propertyValue.indexOf('node_modules/font-mfizz/dist/') > -1) {
	          		return propertyValue.replace('node_modules/font-mfizz/dist/', '');
	        	}
	      	}
	   	}
  	}
}).minify(result.styles);

fs.writeFileSync('static/assets/' + blogCSSFilename, output.styles);
console.log('Blog page css files compress succeed. You can find it at "static/assets".\n');
