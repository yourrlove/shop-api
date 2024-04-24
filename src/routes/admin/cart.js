'use strict'

const express = require('express')
const router = express.Router();
const cartController = require('../controllers/cart.controller')

router.get('/', cartController.get_list_carts) // get all carts of customer
router.get('/getall/:id', cartController.get_list_item)
router.post('/:id/addtocard', cartController.add_to_cart)  // add new item to cart
router.post('/createcart',  cartController.create_cart)  // update item from cart
router.put('/update/:id', cartController.update_cart )  // 
router.delete('/:id/delete_item', cartController.delete_cart_item)  // 

module.exports = router;