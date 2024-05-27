const CheckOutService = require("../services/checkout.service");
const OrderService = require("../services/order.service");
const { OK, CREATED } = require("../core/success.response");

class OrderController {
  checkOutDeliveryInformation = async (req, res, next) => {
    new OK({
      message: "Check out delivery information",
      metadata: await CheckOutService.checkOutDeliveryInformation(
        req.user.user_id
      ),
    }).send(res);
  };

  checkOutReviewOrder = async (req, res, next) => {
    new OK({
      message: "Check out order review",
      metadata: await CheckOutService.checkOutReviewOrder({
        user_id: req.user.user_id,
        ...req.body,
      }),
    }).send(res);
  };

  createOrder = async (req, res, next) => {
    new CREATED({
      message: "Order created successfully!",
      metadata: await OrderService.create({
        user_id: req.user.user_id,
        ...req.body,
      }),
    }).send(res);
  };

  getUserOrders = async (req, res, next) => {
    const sortBy = [req.query.field, req.query.sort];
    new OK({
      message: "Get user orders",
      metadata: await OrderService.getUserOrders(req.user.user_id, { sortBy }),
    }).send(res);
  };

  updateOrderStatus = async (req, res, next) => {
    new OK({
      message: "Update order status",
      metadata: await OrderService.updateStatus(
        req.user.user_id,
        req.params.order_id,
        req.body,
      ),
    }).send(res);
  }

  getOrderDetail = async (req, res, next) => {
    new OK({
      message: "Get order detail",
      metadata: await OrderService.getOrderDetail(req.user.user_id, req.params.order_id),
    }).send(res);
  };
}

module.exports = new OrderController();
