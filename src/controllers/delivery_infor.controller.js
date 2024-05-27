const DeliveryInforService = require('../services/delivery_infor.service');
const { OK, CREATED } = require('../core/success.response');


class DeliveryInforController {
    createDeliveryInfor = async (req, res, next) => {
        new CREATED({
            message: 'DeliveryInfor created successfully!',
            metadata: await DeliveryInforService.create(req.user.user_id, req.body)
        }).send(res);
    }

    getAllDeliveryInfor = async (req, res, next) => {
        new OK({
            message: 'List of DeliveryInfor',
            metadata: await DeliveryInforService.getAll(req.user.user_id)
        }).send(res);
    }

    updateDeliveryInfor = async (req, res, next) => {
        new OK({
            message: 'DeliveryInfor updated successfully!',
            metadata: await DeliveryInforService.update(req.user.user_id, req.params.delivery_id, req.body)
        }).send(res);
    }

    deleteDeliveryInfor = async (req, res, next) => {
        new OK({
            message: 'DeliveryInfor deleted successfully',
            metadata: await DeliveryInforService.delete(req.user.user_id, req.params.delivery_id)
        }).send(res);
    }
}

module.exports = new DeliveryInforController();