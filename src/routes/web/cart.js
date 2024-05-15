'use strict'

const express = require('express')
const router = express.Router();
const { asyncHandler } = require('../../helpers/index');
const { verifyToken } = require('../../middlewares/auth');
const cartController = require('../../controllers/cart.controller')

router.get('/:id', verifyToken, asyncHandler(cartController.get_list_item))
router.post('/add_to_cart', verifyToken, asyncHandler(cartController.add_to_cart))  // add new item to cart
router.put('/update/:cartId', verifyToken, asyncHandler(cartController.update_cart))  // 
router.delete('/:cartId/cartitem/:productdetailId', verifyToken, asyncHandler(cartController.delete_cart_item))  // 

module.exports = router;