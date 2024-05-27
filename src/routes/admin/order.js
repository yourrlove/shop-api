'use strict'

const express = require('express')
const router = express.Router();
const { asyncHandler } = require('../../helpers/index');
const OrderController = require('../../controllers/order.controller')

router.post('/', asyncHandler(OrderController.createOrder));
router.post('/:id/orderdetails', asyncHandler(OrderController.createOrderDetail))
router.get('/:id', asyncHandler(OrderController.getAllCartItem))

module.exports = router;