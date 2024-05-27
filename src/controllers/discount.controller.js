const DiscountService = require('../services/discount.service');
const { CREATED, OK } = require('../core/success.response');

class DiscountController {
    createDiscount = async (req, res, next) => {
        new CREATED({
            message: 'Discount created successfully!',
            metadata: await DiscountService.create(req.body)
        }).send(res);
    }

    getProductSkusByDiscountCode = async (req, res, next) => {
        new OK({
            message: 'List of product skus by discount code',
            metadata: await DiscountService.getProductSkusByDiscountCode({ discount_code: req.query.discountCode })
        }).send(res);
    }

    getAllDiscounts = async (req, res, next) => {
        new OK({
            message: 'List of discounts',
            metadata: await DiscountService.getAllDiscounts()
        }).send(res);
    }

    updateDiscount = async (req, res, next) => {
        new OK({
            message: 'Discount updated successfully',
            metadata: await DiscountService.update(req.params.discountId, req.body)
        }).send(res);
    }

    deleteDiscount = async (req, res, next) => {
        new OK({
            message: 'Discount deleted successfully',
            metadata: await DiscountService.delete(req.params.discountId)
        }).send(res);
    }
}

module.exports = new DiscountController();