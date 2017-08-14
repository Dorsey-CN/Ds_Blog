var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
// 引入基本配置
var config = require('./webpack.config.js');

config.module.rules[0].use[0].options = {
    loaders: {
        scss: ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: ['css-loader', 'sass-loader']
        })
    }
}

config.plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    // 压缩代码
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: false
        }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 提取css为单文件
    new ExtractTextPlugin("css/[name].[contenthash].css"),
    new HtmlWebpackPlugin({
        filename: '../index.html',
        template: path.resolve(__dirname, '../front_stage/index.html'),
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
    })
];

module.exports = config;
