
const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");
const open = require('open');

// 调用webpack并把配置传递过去
const compiler = webpack(webpackConfig);
// 使用 webpack-dev-middleware 中间件
const devMiddleware = webpackDevMiddleware(compiler);
// 使用 webpack-hot-middleware 中间件
const hotMiddleware = webpackHotMiddleware(compiler);

app.use(devMiddleware);
app.use(hotMiddleware);

app.listen(3000, function(){
    open('http://localhost:3000', "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe");
});