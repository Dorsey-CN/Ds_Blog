var express = require('express');
var webpack = require('webpack');
var path = require('path');
var proxyMiddleware = require('http-proxy-middleware');
var config = require('./webpack.dev.conf.js');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

// var proxyTable = {
//     '/article/': {
//         target: 'http://localhost:3000/article/',
//         changeOrigin: true,
//         pathRewrite: {
//             '^/article/': ''
//         }
//     },
//     '/user/': {
//         target: 'http://localhost:3000/user/',
//         changeOrigin: true,
//         pathRewrite: {
//             '^/user/': ''
//         }
//     },
//     '/manager/': {
//         target: 'http://localhost:3000/manager/',
//         changeOrigin: true,
//         pathRewrite: {
//             '^/manager/': ''
//         }
//     },
//     '/admin/': {
//         target: 'http://localhost:3000/admin/',
//         changeOrigin: true,
//         pathRewrite: {
//             '^/admin/': ''
//         }
//     },
//     '/comment/': {
//         target: 'http://localhost:3000/comment/',
//         changeOrigin: true,
//         pathRewrite: {
//             '^/comment/': ''
//         }
//     }
// };

var app = express();

var complier = webpack(config);

var devMiddlware = require('webpack-dev-middleware')(complier, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});

var hotMiddleware = require('webpack-hot-middleware')(complier);

complier.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({ action: 'reload' });
        cb();
    });
});

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(context, options))
// });

app.use(devMiddlware);
app.use(hotMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic(path.join(__dirname, '../front_stage')));

/** 后端服务 **/
var fs = require('fs');

// var port = process.env.PORT || 3000;
// app.listen(port);
// console.log('dorsey started on port ' + port);

var dbUrl = 'mongodb://localhost:27017/blog';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../back_stage/app/views'));

var mongoose = require('mongoose');
mongoose.connect(dbUrl);
console.log('MongoDB connection success!');

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

app.locals.moment = require('moment');

// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// var serveStatic = require('serve-static');
// app.use(serveStatic('public'));
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(require('connect-multiparty')());
var cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'user',
    secret: 'dorsey',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    }),
    cookie: {
        maxAge: 60000
    },
    resave: false
}));

var morgan = require('morgan');
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    app.set('showStackError', true);
    app.use(morgan(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}

require('../back_stage/config/routes.js')(app);
/** 后端服务结束 **/


app.listen(8000, function(err) {
    if (err)
        console.log(err);

    console.log('Listenning at 8000 port...');
});
