'use strict'

const express = require('express')
const router = express.Router();
const { asyncHandler } = require('../../helpers/index');
const { verifyToken } = require('../../middlewares/auth');
const OrderController = require('../../controllers/order.controller');

router.get('/deliveryinfor', verifyToken, asyncHandler( OrderController.checkOutDeliveryInformation ));
router.post('/checkout', verifyToken, asyncHandler( OrderController.checkOutReviewOrder ));
router.post('/', verifyToken, asyncHandler( OrderController.createOrder ));
router.get('/', verifyToken, asyncHandler( OrderController.getUserOrders ));
router.put('/:order_id', verifyToken, asyncHandler( OrderController.updateOrderStatus ));

module.exports = router;