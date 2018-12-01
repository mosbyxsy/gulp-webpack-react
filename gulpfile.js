var gulp = require('gulp');
var glob = require('glob');
var webpack = require('webpack');
var runSequence = require('run-sequence');
var fse = require('fs-extra');
var webpackConfig = require('./webpack.config');
var path = require('path');

gulp.task("clean", function() {
    fse.removeSync("./dist/index.html");
    fse.removeSync("./dist/README.md");
});

gulp.task("copy", function() {
    fse.copySync("./index.html", "./dist/index.html")
});

gulp.task("webpack", function(callback) {
    webpack(webpackConfig, function(er, stats) {
        if (!er) {
            callback();
        }
    })
})

gulp.task("read", function() {
    var text = fse.readFileSync('./README.md', 'utf8');
    fse.outputFileSync('./dist/README.md', text + "这是一个编译后的文件夹");
});

gulp.task("pages", function() {
    var pages = glob.sync("./src/component/*/");    
    pages.forEach(function(item) {
        console.log("component:" + path.basename(item));
    });
});

gulp.task("html", function() {
    var html = fse.readFileSync('./dist/index.html', 'utf8');
    var js = glob.sync("./dist/*.js"); 
    var css = glob.sync("./dist/*.css");
    js = js.map(function(item) {
        return '<script type="text/javascript" src="' + path.basename(item) + '"></script>';
    })
    css = css.map(function(item) {
        return '<link rel="stylesheet" type="text/css" href="' + path.basename(item) + '"/>';
    })
    html = html.replace("{css}", css.join("")).replace("{js}", js.join(""));
    fse.outputFileSync('./dist/index.html', html);
})

gulp.task("default", function(callback) {
    runSequence("clean", "webpack", "read", "copy", "pages", "html", callback);
})
