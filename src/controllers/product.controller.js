'use strict';
const { OK, CREATED } = require('../core/success.response');
const ProductService = require('../services/product.service');
const ProductDetailService = require('../services/product_detail.service');
const { formatDataReturn } = require('../utils/index');

class ProductController {
    create_product = async (req, res, next) => {
        new OK({
            message: 'Product created successfully',
            metadata: await ProductService.create(req.body)
        }).send(res);
    }
    
    get_list_products = async (req, res, next) => {
        new OK({
            message: 'List of products',
            metadata: await ProductDetailService.get_all()
        }).send(res);
    }

    update_product = async (req, res, next) => {
        new OK({
            message: 'Product updated successfully',
            metadata: await ProductService.update(req.params.id, req.body)
        }).send(res);
    }

    delete_product = async (req, res, next) => {
        new OK({
            message: 'Product deleted successfully',
            metadata: await ProductService.delete(req.params.id)
        }).send(res);
    }

    create_product_detail = async (req, res, next) => {
        new CREATED({
            message: 'Product detail created successfully',
            metadata: await ProductDetailService.create(req.params.id, { ...req.body, files: req.files })
        }).send(res);
    }

    get_all_product_details = async (req, res, next) => {
        new OK({
            message: 'List of product details',
            metadata: await ProductDetailService.get_all(req.params.id)
        }).send(res);
    }
    
    delete_product_detail = async (req, res, next) => {
        new OK({
            message: 'Product detail deleted successfully',
            metadata: await ProductDetailService.delete(req.params.id)
        }).send(res);
    }

    update_product_detail = async (req, res, next) => {
        new OK({
            message: 'Product detail updated successfully',
            metadata: await ProductDetailService.update(req.params.id, req.body)
        }).send(res);
    }

    get_products_by_brand_id = async (req, res, next) => {
        new OK({
            message: 'List of products by brand',
            metadata: await ProductService.get_by_brand_id(req.params.brandId)
        }).send(res);
    }

    get_products_by_brand_name = async (req, res, next) => {
        new OK({
            message: 'List of products by brand',
            metadata: await ProductService.get_by_brand_name(req.query.brandName)
        }).send(res);
    }

    get_products_by_category_id = async (req, res, next) => {
        new OK({
            message: 'List of products by category',
            metadata: await ProductService.get_by_category_id(req.params.categoryId)
        }).send(res);
    }
    
    get_products_by_category_name = async (req, res, next) => {
        new OK({
            message: 'List of products by category',
            metadata: await ProductService.get_by_category_name(req.query.categoryName)
        }).send(res);
    }

    get_products_by_tag_name = async (req, res, next) => {
        new OK({
            message: 'List of products by tag',
            metadata: await ProductService.get_by_tag_name(req.query.tagName)
        }).send(res);
    }

    filter_products = async (req, res, next) => {
        new OK({
            message: 'List of products',
            metadata: await ProductDetailService.filter_by_query_options(req.body)
        }).send(res);
    }    

    create_product_slug = async (req, res, next) => {
        new CREATED({
            message: 'Product slug created successfully',
            metadata: await ProductDetailService.createProductDetailslug()
        }).send(res);
    }
}

module.exports = new ProductController();