const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { webSpecification } = require('../../configs/Documentation/swagger-config');

const productRouter = require('./product');

const user_api = express();

user_api.use('/api-docs', swaggerUi.serveFiles(webSpecification), swaggerUi.setup(webSpecification));
user_api.use('/products', productRouter);

module.exports = user_api;