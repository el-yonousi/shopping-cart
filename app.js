const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/* express handlbars */
const exphbs = require('express-handlebars');

/* call session */
const session = require('express-session')

/* connect flash */
const flash = require('connect-flash')

/* call passport */
const passport = require('passport')

// const expressValidator = require('express-validator')

/**
 * call mongoose
 */
const mongoose = require('mongoose')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

/**
 * connect mongoDB
 */
mongoose.connect('mongodb://localhost/shopping-cart', (error) => {
    if (error) {
        console.log('DATABASE ERROR:: ', error)
    } else {
        console.log('DATABASE CONNECTED SUCCESS..')
    }
})

/* export configuration passport because you can't export it as model */
require('./config/passport')

// view engine setup
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultView: 'default',
    defaultLayout: 'layout',
    // layoutsDir: __dirname + '/views/pages/',
    // partialsDir: __dirname + '/views/partials/'
}));
// app.set('views', path.join(__dirname, 'views')); express seul

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/* express session */
app.use(session({
    secret: 'shppinp-cart_?@!$$%',
    /* those fields emppty */
    saveUninitialized: false,
    resave: false /* replace fields */
}))

/* express connect flash */
app.use(flash())

/* */
app.use(passport.initialize())
app.use(session())

app.use(express.static(path.join(__dirname, 'public')))

/* use router */
app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;