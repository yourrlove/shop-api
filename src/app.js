require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { WEB_DOMAIN_URL } = require('./constants/index.js'); 

// Routers
const indexRouter = require('./routes/auth');
const admin_api = require('./routes/admin/index');
const user_api = require('./routes/user/index');
// Middlewares
const corsOptions = require('./configs/CORS/corsOptions');
const credentials = require('./middlewares/credentials');

const app = express();
 
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//init mysql db
const { sequelize } = require('./databases/init.mysql')

// init mongodb
// require('./databases/init.mongodb')

app.use('/v1', indexRouter);
app.use('/v1/admin', admin_api);
app.use('/v1/web', user_api);

/* GET home page. */
app.get('/', function(req, res, next) {
  res.json({
    "msg": "Hello World",
    "web-api-docs": `${WEB_DOMAIN_URL}/v1/web/api-docs`,
    "admin-api-docs": `${WEB_DOMAIN_URL}/v1/admin/api-docs`
  });
});

// handling errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
});


module.exports = app;
