var express = require('express');
var fs = require('fs');
var app = express();
var formidable = require('express-formidable');

var port = process.env.PORT || 3000;
app.listen(port);
console.log('dorsey started on port ' + port);

var path = require('path');
var dbUrl = 'mongodb://localhost:27017/blog';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

var mongoose = require('mongoose');
mongoose.connect(dbUrl);
console.log('MongoDB connection success!');

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

app.locals.moment = require('moment');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
var serveStatic = require('serve-static');
app.use(serveStatic('public'));
var cookieParser = require('cookie-parser');
app.use(cookieParser());
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

app.use(formidable());

var morgan = require('morgan');
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    app.set('showStackError', true);
    app.use(morgan(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}

require('./config/routes.js')(app);
