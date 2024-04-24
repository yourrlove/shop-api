'use strict';

const ProductService = require('../services/product.service');
const ProductDetailService = require('../services/product_detail.service');

class ProductController {
    create_product = async (req, res, next) => {
        try {
            res.status(201).json(await ProductService.create(req.body));
        }
        catch (err) {
            res.status(500).json(err.errors);
        }

    }

    get_list_products = async (req, res, next) => {
        try {
            res.status(200).json(await ProductService.get_all());
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    update_product = async (req, res, next) => {
        try {
            res.status(200).json(await ProductService.update(req.params.id, req.body));
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    delete_product = async (req, res, next) => {
        try {
            res.status(200).json(await ProductService.delete(req.params.id));
        } catch (err) {
            res.status(500).json(err);
        }
    }

    create_product_detail = async (req, res, next) => {
        try {
            res.status(201).json(await ProductDetailService.create(req.params.id, req.body));
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    get_all_product_details = async (req, res, next) => {
        try {
            res.status(200).json(await ProductDetailService.get_all(req.params.id));
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    
    delete_product_detail = async (req, res, next) => {
        try {
            res.status(200).json(await ProductDetailService.delete(req.params.id));
        } catch (err) {
            res.status(500).json(err);
        }
    }

    update_product_detail = async (req, res, next) => {
        try {
            res.status(200).json(await ProductDetailService.update(req.params.id, req.body));
        } catch (err) {
            res.status(500).json(err);
        }
    }
    
}

module.exports = new ProductController();