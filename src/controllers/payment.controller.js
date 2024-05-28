const PaymentService = require('../services/payment.service');
const { OK, CREATED } = require('../core/success.response');


class PaymentController {
    handlePaymentResponse = async (req, res, next) => {
        new OK({
            message: 'Payment successful',
            metadata: await PaymentService.handlePayOsHook(req.body)
        }).send(res);
    }

    handlePaymentResult = async (req, res, next) => {
        new OK({
            message: 'Payment result received successfully!',
            metadata: await PaymentService.handlePaymentResult(req.body)
        }).send(res);
    }
}

module.exports = new PaymentController();