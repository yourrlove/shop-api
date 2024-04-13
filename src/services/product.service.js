'use strict';
const db = require('../models/index');
const { generateUUID } = require('../helpers/index');

class ProductService {
    static createProduct = async ({ name }) => {
        const id = generateUUID();
        const product = await db.Product.create({ id, name });
        return product;
    }
}

module.exports = ProductService;