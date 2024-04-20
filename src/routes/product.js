const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../helpers/index');
const productController = require('../controllers/product.controller')



router.post('/', asyncHandler( productController.create_product ));
router.get('/', asyncHandler( productController.get_list_products ));
router.put('/:id', asyncHandler( productController.update_product ));
router.delete('/:id', asyncHandler( productController.delete_product ));
router.post('/:id/productdetails', asyncHandler( productController.create_product_detail ));
router.get('/:id/productdetails', asyncHandler( productController.get_all_product_details ));
router.delete('/productdetails/:id', asyncHandler( productController.delete_product_detail ));
router.put('/productdetails/:id', asyncHandler( productController.update_product_detail ));

module.exports = router;