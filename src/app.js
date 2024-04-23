require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
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
app.use(express.static(path.join(__dirname, 'public')));

//init mysql db
const { sequelize } = require('./databases/init.mysql')

// init mongodb
// require('./databases/init.mongodb')

// app.use('/api/web/api-docs', swaggerUi.serveFiles(webSpecification), swaggerUi.setup(webSpecification));
app.use('/v1', indexRouter);
app.use('/v1/admin', admin_api);
app.use('/v1/web', user_api);

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index');
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
