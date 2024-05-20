'use strict'

const express = require('express')
const router = express.Router();
const { asyncHandler } = require('../../helpers/index');
const { verifyToken } = require('../../middlewares/auth');
const OrderController = require('../../controllers/order.controller');

router.post('/checkout', verifyToken, asyncHandler( OrderController.checkOutReviewOrder ));
router.post('/', verifyToken, asyncHandler( OrderController.createOrder ));

module.exports = router;