const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { webSpecification } = require('../../configs/Documentation/swagger-config');

const productRouter = require('./product');
const userRouter = require('./user');
const cartRouter = require('./cart')

const web_api = express();

web_api.use('/api-docs', swaggerUi.serveFiles(webSpecification), swaggerUi.setup(webSpecification));
web_api.use('/products', productRouter);
web_api.use('/users', userRouter);
web_api.use('/cart', cartRouter);

module.exports = web_api;