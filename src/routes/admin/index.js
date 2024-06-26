const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { adminSpecification } = require('../../configs/Documentation/swagger-config');

const usersRouter = require('./users');
const productRouter = require('./product');
const roleRouter = require('./role');
const brandRouter = require('./brand');
const catalogueRouter = require('./catalogue');
const tagRouter = require('./tag');
const discountRouter = require('./discount');
const orderRouter = require('./order');

const admin_api = express();

admin_api.use('/api-docs', swaggerUi.serveFiles(adminSpecification), swaggerUi.setup(adminSpecification));
admin_api.use('/users', usersRouter);
admin_api.use('/products', productRouter);
admin_api.use('/roles', roleRouter);
admin_api.use('/brands', brandRouter);
admin_api.use('/catalogues', catalogueRouter);
admin_api.use('/tags', tagRouter);
admin_api.use('/discounts', discountRouter);
admin_api.use('/orders', orderRouter);

module.exports = admin_api;