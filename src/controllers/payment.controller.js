const PaymentService = require('../services/payment.service');
const { OK, CREATED } = require('../core/success.response');


class PaymentController {
    handlePaymentResponse = async (req, res, next) => {
        new OK({
            message: 'Payment successful',
            metadata: await PaymentService.handlePayOsHook(req.body)
        }).send(res);
    }

    handleCancelledPayment = async (req, res, next) => {
        new OK({
            message: 'Payment cancelled',
            metadata: await PaymentService.handleCancelled(req.body)
        }).send(res);
    }
}

module.exports = new PaymentController();