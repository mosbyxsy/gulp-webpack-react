var webpack = require('webpack');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		index: "./src/main.jsx"
	},
	output: {
		filename: "[name].js",
		path: __dirname + "/dist"
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ['env', 'react']
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.scss/,
				use: ExtractTextWebpackPlugin.extract({
                    fallback:'style-loader',
                    use: [
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
                })

			},
			{
				test: /\.less/,
				use: ExtractTextWebpackPlugin.extract({
                    fallback:'style-loader',
                    use: [
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
                })
			}
		]
	},
	plugins: [
		new cleanWebpackPlugin(['dist']),
		new ExtractTextWebpackPlugin("[name].css")
	]
}