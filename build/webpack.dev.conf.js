var htmlWebpackPlguin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var config = require('./webpack.config.js');

config.output.publicPath = '/';

config.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new htmlWebpackPlguin({
        filename: 'front_stage/index.html',
        template: path.resolve(__dirname, '../front_stage/index.html'),
        inject: true
    })
];

// var devClient = 'webpack-hot-middleware/client';
var devClient = './build/dev-client';
Object.keys(config.entry).forEach(function(name, i) {
    var extras = [devClient];
    config.entry[name] = extras.concat(config.entry[name]);
})

module.exports = config;
