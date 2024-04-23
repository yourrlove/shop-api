const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { adminSpecification } = require('../../configs/Documentation/swagger-config');

const usersRouter = require('./users');
const productRouter = require('./product');
const roleRouter = require('./role');
const brandRouter = require('./brand');
const categoryRouter = require('./category');


const admin_api = express();

admin_api.use('/api-docs', swaggerUi.serveFiles(adminSpecification), swaggerUi.setup(adminSpecification));
admin_api.use('/users', usersRouter);
admin_api.use('/products', productRouter);
admin_api.use('/roles', roleRouter);
admin_api.use('/brands', brandRouter);
admin_api.use('/categories', categoryRouter);

module.exports = admin_api;