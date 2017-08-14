var path = require('path');
var projectRoot = path.resolve(__dirname, '../');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, '../front_stage/src/main.js')
    },
    output: {
        path: path.resolve(__dirname, '../output/static'),
        publicPath: 'static/',
        filename: 'js/[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        // fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            // 'src': path.resolve(__dirname, '../front_stage/src'),
            // 'static': path.resolve(__dirname, '../front_stage/static/'),
            'components': path.resolve(__dirname, '../front_stage/src/components/'),
            'common': path.resolve(__dirname, '../front_stage/src/common/')
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader'
            }],
        }, {
            test: /\.js$/,
            exclude: [
                path.resolve(__dirname, '../node_modules/')
            ],
            loader: 'babel-loader',
            options: {
                babelrc: false,
                presets: ['es2015']
            }
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash:7]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash:7]'
            }
        }]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: '../index.html',
            template: path.resolve(__dirname, '../front_stage/index.html'),
            inject: true
        })
    ]
}
