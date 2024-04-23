const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../helpers/index');
const productController = require('../../controllers/product.controller')

// filter products
router.post('/filter', asyncHandler( productController.filter_products));

module.exports = router;