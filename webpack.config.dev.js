var webpack = require('webpack');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
var purifyCss = require('purifycss-webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require('glob');
var path = require('path');

module.exports = {
	entry: {
		index: [
		    'react-hot-loader/patch',
		    "./src/root.jsx"
		]
	},
	output: {
		filename: "[name].js",
		path: __dirname + "/dist"
	},
	resolve: {
        extensions: ['.js', '.jsx','.json'],
    },
    devServer: {
        contentBase:false,
        host: '127.0.0.1',
        port: '8888',
        inline: true,//webpack官方推荐
        watchOptions: {
            aggregateTimeout: 1000,//浏览器延迟多少秒更新
            poll: 1000//每秒检查一次变动
        },
        compress: false,
        historyApiFallback: true,//找不到页面默认跳index.html
        hot: true,//启动热更新，必须搭配new webpack.HotModuleReplacementPlugin()插件
        hotOnly: true,
        open: true
    },
	module: {
		rules: [
			{
				test: /\.jsx?/, 
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ['env', 'react'],
							plugins: ["react-hot-loader/babel"]
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.css/, 
				use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader"
                    }
                ]
			},
			{
				test: /\.scss/, 
				use: [
				    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "fast-sass-loader"
                    }
                ]
			},
			{
				test: /\.less/,
				use: [
				    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: {
                                hd: '2px'
                            }
                        }
                    }
                ]
			}
		]
	},
	plugins: [
	    new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
		    template: "./src/template.html",
            title: '测试页面',
            inject: true
        }),
        new webpack.ProvidePlugin({
            React: "react",
            ReactDom: "react-dom"
        })
	]
}


console.log("123", JSON.stringify(process.env.NODE_ENV))