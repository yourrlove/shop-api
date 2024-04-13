'use strict';

const ProductService = require('../services/product.service');

class ProductController {
    create = async (req, res, next) => {
        try {
            res.status(201).json(await ProductService.createProduct(req.body));
        }
        catch (err) {
            console.log(err);
        }

    }
}

module.exports = new ProductController();