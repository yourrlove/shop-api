'use strict';
const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../helpers/index');
const DiscountController = require('../../controllers/discount.controller');

router.get('/products', asyncHandler( DiscountController.getProductSkusByDiscountCode ));
router.post('/', asyncHandler( DiscountController.createDiscount ));
router.get('/', asyncHandler( DiscountController.getAllDiscounts ));
router.put('/:discountId', asyncHandler( DiscountController.updateDiscount ));
router.delete('/:discountId', asyncHandler( DiscountController.deleteDiscount ));

module.exports = router;

