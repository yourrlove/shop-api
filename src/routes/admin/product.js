const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../helpers/index');
const productController = require('../../controllers/product.controller');
const UploadController = require('../../controllers/upload.controller');
const { uploadDisk } = require('../../configs/config.multer');


router.post('/', asyncHandler( productController.create_product ));
router.get('/', asyncHandler( productController.get_list_products ));
router.put('/:id', asyncHandler( productController.update_product ));
router.delete('/:id', asyncHandler( productController.delete_product ));
router.post('/:id/productdetails', asyncHandler( productController.create_product_detail ));
router.get('/:id/productdetails', asyncHandler( productController.get_all_product_details ));
router.delete('/productdetails/:id', asyncHandler( productController.delete_product_detail ));
router.put('/productdetails/:id', asyncHandler( productController.update_product_detail ));

// find product by brand
router.get('/brands/:brandId', asyncHandler( productController.get_products_by_brand_id ));
router.get('/brands', asyncHandler( productController.get_products_by_brand_name ));
//find product by category
router.get('/categories/:categoryId', asyncHandler( productController.get_products_by_category_id ));
router.get('/categories', asyncHandler( productController.get_products_by_category_name ));

// filter products
router.post('/filter', asyncHandler( productController.filter_products));

//upload product image
router.post('/:productId/:productdetailId/thumb', asyncHandler( UploadController.upload_product_thumbnail ));
router.post('/productdetails/:id/upload', uploadDisk.array('files'), asyncHandler( UploadController.upload_product_detail_images ));

module.exports = router;