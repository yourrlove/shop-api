require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Router
const indexRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');
const roleRouter = require('./routes/role');
const brandRouter = require('./routes/brand');
const categoryRouter = require('./routes/category');

const cors = require('cors');
const corsOptions = require('./configs/CORS/corsOptions');
const credentials = require('./middlewares/credentials');

const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'YOLO Website API',
          description: "This is a REST api for YOLO website. You can find out more about YOLO at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).",
          version: '1.0.0',
          contact: {
            email: 'nanhvt2708@gmail.com'
          },
          termsOfService: 'http://swagger.io/terms/'
        },
        servers: [
          {
            url: 'https://localhost:3000/yolo/api/v1'
          }
        ]
    },
    apis: [path.join(__dirname,'configs','swagger','**','*.yaml')], // files containing annotations as above
  };

const openapiSpecification = swaggerJsdoc(options);


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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//init mysql db
const { initialize, sequelize } = require('./databases/init.mysql')
// initialize()
// .then(() => {
//   console.log('Connected Mysqldb Success');
// })
// .catch(err => {
//   console.log(err);
// });




// init mongodb
// require('./databases/init.mongodb')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/roles', roleRouter);
app.use('/brands', brandRouter);
app.use('/categories', categoryRouter);

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
