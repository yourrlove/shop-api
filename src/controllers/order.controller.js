'use strict'
const OrderService = require('../services/order.service')
const OrderDetailService = require('../services/order_detail.service')
const { OK, CREATED } = require('../core/success.response');
class OrderController {
    createOrderDetail = async(req, res, next) => {
        new CREATED({
            message: 'Create Order detail successfully',
            metadata: await OrderDetailService.createdetail(req.params.id, req.body)
        }).send(res);
    }

    createOrder = async(req, res, next) => {
        new CREATED ({
            message: 'Order created successfully',
            metadata: await OrderService.create(req.body)
            
        }).send(res)
    }

    getAllCartItem = async(req, res, next) => {
        new OK ({
            message: 'CartItem of user',
            metadata: await OrderService.getOrders(req.params.id)
            //metadata: await OrderDetailService.testservicedetail() 
        }).send(res)
    }
}

module.exports =  new OrderController()



