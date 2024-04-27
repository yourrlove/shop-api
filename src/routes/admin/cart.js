'use strict'

const express = require('express')
const router = express.Router();
const { asyncHandler } = require('../../helpers/index');
const cartController = require('../../controllers/cart.controller')

router.get('/', asyncHandler(cartController.get_list_carts)) // get all carts of customer
router.get('/getall/:id', asyncHandler(cartController.get_list_item))
router.post('/:id', asyncHandler(cartController.add_to_cart))  // add new item to cart
router.post('/createcart',  asyncHandler(cartController.create_cart))  // update item from cart
router.put('/:id', asyncHandler(cartController.update_cart))  // 
router.delete('/:id', asyncHandler(cartController.delete_cart_item))  // 

module.exports = router;