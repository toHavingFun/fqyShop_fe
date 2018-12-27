var Hogan = require('hogan.js');
var conf = {
	serverHost: ''
};
var _fqy = {
	request: function(param) {
		var _this = this;
		$.ajax({
			type: param.method || 'get',
			url: param.url || '',
			dataType: param.type || 'json',
			data: param.data || '',
			success: function(res) {
				// 请求成功
				if(0 === res.status) {
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				// 没有登录状态，需要强制登录
				else if(10 === res.status) {
					_this.doLogin();
				}
				// 请求数据错误
				else if(1 === res.status) {
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error: function(err) {
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	// 统一登录处理
	doLogin: function() {
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	getServerUrl: function(path) {
		return conf.serverHost + path;
	},
	getUrlParam: function(name) {
		var regex = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var res = window.location.search.substr(1).match(regex);
		return res ? decodeURIComponent(res[2]) : null;
	},
	// render : 渲染
	renderHtmlWithDataAndTemplate: function(data,template) {
		var template = Hogan.compile(template);
		var res = template.render(data);
		return res;
	},
	successTips: function() {
		alert('操作成功~');
	},
	errorTips: function() {
		alert('亲,操作失败了哟~');
	},
	validate: function(value, valueType) {
		var value = value.trim(value);
		if('require' === valueType) {
			return !!value;
		}
		if('phone' === valueType) {
			return /^1(3|4|5|7|8)\d{9}$/.test(value);
		}
		if('email' === valueType) {
			return /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/.test(value);
		}
	},
	goHome:function(){
		window.location.href = './index.';
	}
};
module.exports = _fqy;