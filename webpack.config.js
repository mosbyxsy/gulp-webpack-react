var webpack = require('webpack');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
var purifyCss = require('purifycss-webpack');
var glob = require('glob');
var path = require('path');

module.exports = {
	entry: {
		index: "./src/root.jsx"
	},
	output: {
		filename: "[name].js",
		path: __dirname + "/dist"
	},
	resolve: {
        extensions: ['.js', '.jsx','.json'],
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
				test: /\.css/, 
				use: ExtractTextWebpackPlugin.extract({
                    fallback:'style-loader',
                    use: [
						{
							loader: "css-loader"
						}
                    ]
                })

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
		new ExtractTextWebpackPlugin("[name].css"),
		new purifyCss({
			paths: glob.sync(
                path.resolve(__dirname, './+(src/*.jsx | *.html)')          
            )
		})
	]
}