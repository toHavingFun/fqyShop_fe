var _fqy = require('util/fqy.js');
var _user = {
	login : function(userInfo,resolve,reject){
		_fqy.request({
			url:_fqy.getServerUrl('http://localhost:3000/users.action'),
			data:userInfo,
			method:'GET',
			result:resolve,
			error:reject
		});
		
	}
};
module.exports = _user;
