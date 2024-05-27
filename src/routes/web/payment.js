'use strict'

const express = require('express')
const router = express.Router();
const { asyncHandler } = require('../../helpers/index');
const PaymentController = require('../../controllers/payment.controller');

router.post('/payos-hook', asyncHandler( PaymentController.handlePaymentResponse ));
router.post('/cancelled', asyncHandler( PaymentController.handleCancelledPayment ));

module.exports = router;