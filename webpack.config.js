var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var htmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
//console.log(WEBPACK_ENV);
var getHtmlConfig = function(name) {
	return {
		template: './src/view/' + name + '.html', //模板来源文件
		filename: 'view/' + name + '.html', // 生成的模板文件的名字 默认index.html
		inject: true, //注入位置'head','body',true,false
		hash: true, //是否生成hash添加在引入文件地址的末尾，类似于我们常用的时间戳，这个可以避免缓存带来的麻烦
		chunks: ['common', name] //引入的a,b模块，这里指定的是entry中设置多个js时，在这里指定引入的js，如果不设置则默认全部引入,数组形式传入
	}
}
var config = {
	//多入口，多出口
	entry: {
		'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'login': ['./src/page/login/index.js']
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist',
		filename: 'js/[name].js'
	},
	// 外部引入的模块
	externals: {
		'jquery': 'window.jQuery'
	},
	plugins: [
	// 通用模块的打包
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common', // 基于上面的output
			filename: 'js/base.js' // 输出文件
		}),
		//单独加载css文件
		new ExtractTextPlugin('css/[name].css'),
		//html 模板文件
		new htmlWebpackPlugin(getHtmlConfig('index')),
		new htmlWebpackPlugin(getHtmlConfig('login')),
	],
	module: {
		rules: [{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
				use: 'url-loader?limit=100&name=resource/[name].[ext]'
			}

		]
	},
	resolve: {
		alias: {
			"node_modules": path.join(__dirname, 'src', 'node_modules'),
			"util": path.join(__dirname, 'src', 'util'),
			"page": path.join(__dirname, 'src', 'page'),
			"service": path.join(__dirname, 'src', 'service'),
			"image": path.join(__dirname, 'src', 'image')
		}
	}
};
module.exports = config;
if('dev' === WEBPACK_ENV) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
}