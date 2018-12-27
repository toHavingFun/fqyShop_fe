require('./index.css');
require('../common/nav-simple/index.js');
var _fqy = require('util/fqy.js');
$(function(){
	var type = _fqy.getUrlParam('type')||'default';
	$element = $('.'+type+'-success').show()
})
