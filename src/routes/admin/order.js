'use strict'

const express = require('express')
const router = express.Router();
const { asyncHandler } = require('../../helpers/index');
const OrderController = require('../../controllers/order.controller');
const { verifyToken } = require('../../middlewares/auth');

router.get('/', asyncHandler( OrderController.getAllOrders ));
router.post('/', asyncHandler(OrderController.createOrder));
router.put('/:order_id', asyncHandler( OrderController.updateOrderStatus ));
router.get('/:order_id', verifyToken, asyncHandler(OrderController.getOrderDetail ));

module.exports = router;