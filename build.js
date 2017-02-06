var UglifyJS = require('uglify-js');
var CleanCSS = require('clean-css');
require('shelljs/global');
var fs = require('fs');
require('colors');

nowDate = new Date();
nowDateStr = nowDate.toISOString().slice(0,10).replace(/-/g,"");

// remove preceding compressed files
rm('-rf', 'static/assets/*.min.js');
rm('-rf', 'static/assets/*.min.css');

// change link/src files to new file path
sed_exp = 's/(.*)[0-9]{8}(.*)/\1' + nowDateStr + '\2/';
sed('-i', /(.*)[0-9]{8}(.*)/, '$1' + nowDateStr + '$2', '_includes/index_head.html');
sed('-i', /(.*)[0-9]{8}(.*)/, '$1' + nowDateStr + '$2', '_includes/head.html');
sed('-i', /(.*)[0-9]{8}(.*)/, '$1' + nowDateStr + '$2', '_includes/category.html');
sed('-i', /(.*)[0-9]{8}(.*)/, '$1' + nowDateStr + '$2', '404.html');

// compress js files function
function compressjs(filename, filelist){
	console.log('Now compress index page js files to ' + filename + ' ...')
	var result = UglifyJS.minify(filelist, {
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

	fs.writeFileSync('static/assets/' + filename, result.code);
	console.log("Index page js files compress succeed. You can find it at \"static/assets\".\n".green);
}

// compress css files function
function compresscss(filename, filelist) {
	console.log('Now compress other pages css files to ' + filename + ' ...')
	var result = new CleanCSS().minify(filelist);
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
		        	if (propertyName == 'background' && propertyValue.indexOf('static/img/') > -1) {
		          		return propertyValue.replace('static/', '');
		        	}
		        	if (propertyName == 'background-image' && propertyValue.indexOf('static/img/') > -1) {
		          		return propertyValue.replace('static/', '');
		        	}
		      	}
		   	}
	  	}
	}).minify(result.styles);

	fs.writeFileSync('static/assets/' + filename, output.styles);
	console.log("Blog page css files compress succeed. You can find it at \"static/assets\".\n".green);
}

// compress js files of 404 page
fofJsFilename = 'fof-' + nowDateStr + '.min.js'
fofJsFileList = [
	'node_modules/jquery/dist/jquery.js',
	'node_modules/bootstrap/dist/js/bootstrap.js',
	'node_modules/pace-progress/pace.js'
	]
compressjs(fofJsFilename, fofJsFileList)


// compress css files of 404 page
fofCSSFilename = 'fof-' + nowDateStr + '.min.css'
fofCSSFilelist = [
	'node_modules/normalize.css/normalize.css',
	'node_modules/bootstrap/dist/css/bootstrap.css',
	'node_modules/components-font-awesome/css/font-awesome.css',
	'node_modules/animate.css/animate.css',
	'static/css/style.css'
	]
compresscss(fofCSSFilename, fofCSSFilelist)


// compress js files of index page
indexJsFilename = 'app-index-' + nowDateStr + '.min.js'
indexJsFileList = [
	'node_modules/jquery/dist/jquery.js',
	'node_modules/bootstrap/dist/js/bootstrap.js',
	'node_modules/chart.js/dist/Chart.js',
	'node_modules/pace-progress/pace.js',
	'node_modules/wowjs/dist/wow.js',
	'static/js/scroll.js',
	'static/js/count.js'
	]
compressjs(indexJsFilename, indexJsFileList)


// compress i18next js files
i18JsFilename = 'i18-' + nowDateStr + '.min.js'
i18JsFileList = ['static/js/i18next.min.js', 'static/js/localization.js']
compressjs(i18JsFilename, i18JsFileList)

// compress css files of index page
indexCSSFilename = 'app-index-' + nowDateStr + '.min.css'
indexCSSFilelist = [
	'node_modules/normalize.css/normalize.css',
	'node_modules/bootstrap/dist/css/bootstrap.css',
	'node_modules/animate.css/animate.css',
	'node_modules/components-font-awesome/css/font-awesome.css',
	'node_modules/font-mfizz/dist/font-mfizz.css',
	'static/css/style.css'
	]
compresscss(indexCSSFilename, indexCSSFilelist)


// compress js file of other pages
blogJsFilename = 'app-' + nowDateStr + '.min.js'
blogJsFilelist = [
	'node_modules/jquery/dist/jquery.js',
	'search/js/bootstrap3-typeahead.min.js',
	'node_modules/bootstrap/dist/js/bootstrap.js',
	'node_modules/metismenu/dist/metisMenu.js',
	'node_modules/jquery-slimscroll/jquery.slimscroll.js',
	'node_modules/peity/jquery.peity.js',
	'node_modules/pace-progress/pace.js',
	'node_modules/wowjs/dist/wow.js',
	'static/js/scroll.js',
	'static/js/count.js'
	],
compressjs(blogJsFilename, blogJsFilelist)


// compress jPage js files
jPageJsFilename = 'jPage-' + nowDateStr + '.min.js'
jPageJsFilelist = [
	'static/js/jPages.js',
	'static/js/js.js'
	]
compressjs(jPageJsFilename, jPageJsFilelist)


// compress css files of index page
blogCSSFilename = 'app-' + nowDateStr + '.min.css'
blogCSSFilelist = [
	'node_modules/normalize.css/normalize.css',
	'node_modules/bootstrap/dist/css/bootstrap.css',
	'node_modules/animate.css/animate.css',
	'node_modules/components-font-awesome/css/font-awesome.css',
	'node_modules/font-mfizz/dist/font-mfizz.css',
	'node_modules/gritter/jquery.gritter.css',
	'search/css/cb-search.css',
	'static/css/pygments.css',
	'static/css/style.css'
	]
compresscss(blogCSSFilename, blogCSSFilelist)
