const CheckOutService = require('../services/checkout.service');
const OrderService = require('../services/order.service');
const { OK, CREATED } =  require('../core/success.response');

class OrderController {

    checkOutDeliveryInformation = async (req, res, next) => {
        new OK ({
            message: 'Check out delivery information',
            metadata: await CheckOutService.checkOutDeliveryInformation (req.user.user_id)
        }).send(res);
    }

    checkOutReviewOrder = async (req, res, next) => {
        new OK ({
            message: 'Check out order review',
            metadata: await CheckOutService.checkOutReviewOrder ({ user_id: req.user.user_id, ...req.body })
        }).send(res);
    }

    createOrder = async (req, res, next) => {
        new CREATED ({
            message: 'Order created successfully!',
            metadata: await OrderService.create({ user_id: req.user.user_id, ...req.body })
        }).send(res);
    }
}

module.exports = new OrderController();