'use strict';
const { OK, CREATED } = require('../core/success.response');
const ProductService = require('../services/product.service');
const ProductDetailService = require('../services/product_detail.service');

class ProductController {
    create_product = async (req, res, next) => {
        new OK({
            message: 'Product created successfully',
            data: await ProductService.create(req.body)
        }).send(res);
    }

    get_list_products = async (req, res, next) => {
        new OK({
            message: 'List of products',
            data: await ProductService.get_all()
        }).send(res);
    }

    update_product = async (req, res, next) => {
        new OK({
            message: 'Product updated successfully',
            data: await ProductService.update(req.params.id, req.body)
        }).send(res);
    }

    delete_product = async (req, res, next) => {
        new OK({
            message: 'Product deleted successfully',
            data: await ProductService.delete(req.params.id)
        }).send(res);
    }

    create_product_detail = async (req, res, next) => {
        new CREATED({
            message: 'Product detail created successfully',
            data: await ProductDetailService.create(req.params.id, req.body)
        }).send(res);
    }

    get_all_product_details = async (req, res, next) => {
        new OK({
            message: 'List of product details',
            data: await ProductDetailService.get_all(req.params.id)
        }).send(res);
    }
    
    delete_product_detail = async (req, res, next) => {
        new OK({
            message: 'Product detail deleted successfully',
            data: await ProductDetailService.delete(req.params.id)
        }).send(res);
    }

    update_product_detail = async (req, res, next) => {
        new OK({
            message: 'Product detail updated successfully',
            data: await ProductDetailService.update(req.params.id, req.body)
        }).send(res);
    }
    
}

module.exports = new ProductController();