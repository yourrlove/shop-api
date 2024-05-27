'use strict'

const express = require('express')
const router = express.Router();
const { asyncHandler } = require('../../helpers/index');
const { verifyToken } = require('../../middlewares/auth');
const DeliveryInforController = require('../../controllers/delivery_infor.controller');

router.post('/', verifyToken, asyncHandler( DeliveryInforController.createDeliveryInfor ));
router.get('/', verifyToken, asyncHandler( DeliveryInforController.getAllDeliveryInfor ));
router.put('/:delivery_id', verifyToken, asyncHandler( DeliveryInforController.updateDeliveryInfor ));
router.delete('/:delivery_id', verifyToken, asyncHandler( DeliveryInforController.deleteDeliveryInfor ));

module.exports = router;