require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const refs = require('refs');

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
require('./databases/init.mongodb')

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
