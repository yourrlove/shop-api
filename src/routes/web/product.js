const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../helpers/index');
const productController = require('../../controllers/product.controller');

// filter products
router.post('/filter', asyncHandler( productController.filter_products));
router.get('/', asyncHandler( productController.get_list_products ));
router.get('/:id/productdetails', asyncHandler( productController.get_all_product_details ));

// find product by brand
router.get('/brands', asyncHandler( productController.get_products_by_brand_name ));
//find product by category
router.get('/categories', asyncHandler( productController.get_products_by_category_name ));

router.post('/slugs', asyncHandler( productController.create_product_slug ));

module.exports = router;