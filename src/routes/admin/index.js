const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { adminSpecification } = require('../../configs/Documentation/swagger-config');

const usersRouter = require('./users');
const productRouter = require('./product');
const roleRouter = require('./role');
const brandRouter = require('./brand');
const catalogueRouter = require('./catalogue');
const tagRouter = require('./tag');
const cartRouter = require('./cart')


const admin_api = express();

admin_api.use('/api-docs', swaggerUi.serveFiles(adminSpecification), swaggerUi.setup(adminSpecification));
admin_api.use('/users', usersRouter);
admin_api.use('/products', productRouter);
admin_api.use('/roles', roleRouter);
admin_api.use('/brands', brandRouter);
admin_api.use('/catalogues', catalogueRouter);
admin_api.use('/tags', tagRouter);
admin_api.use('/carts', cartRouter);
module.exports = admin_api;