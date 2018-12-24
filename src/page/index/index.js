require('./index.css');
var _fqy = require('util/fqy.js');
var html = '<h1>{{data}}</h1>';
var data = {
	data :'HelloWorld'
};
console.log(_fqy.renderHtmlWithDataAndTemplate(data,html));
