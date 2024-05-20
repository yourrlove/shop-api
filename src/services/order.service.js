"use strict";
const db = require("../models/index");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { generateUUID } = require("../helpers/index");
const DeliveryInforService = require("./delivery_infor.service");
const CheckOutService = require("./checkout.service");
const { where } = require("sequelize");

class OrderService {
  static create = async ({
    user_id,
    cart_id,
    cart_items,
    discount_code,
    delivery_information,
    payment_method,
  }) => {

    const user = await db.User.findByPk(user_id);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const checkOutResult = await CheckOutService.checkOutReviewOrder({
      user_id,
      cart_id,
      cart_items,
      discount_code,
      delivery_information,
      payment_method,
    });

    const { discount_id } = await db.Discount.findOne({
      where: {
        discount_code: discount_code,
        discount_is_active: true,
      },
      attributes: ["discount_id"],
      raw: true,
    });

    console.log(checkOutResult);
    try {
      const newOrder = await db.Order.create({
        order_id: generateUUID(),
        order_total_price: checkOutResult.total_price,
        order_discount_amount: checkOutResult.discount_amount,
        order_shipping_price: checkOutResult.shipping_price,
        order_final_price: checkOutResult.final_price,
        order_payment_method: checkOutResult.payment_method,
        order_province:
          checkOutResult.delivery_information.shipping_address.province,
        order_city: checkOutResult.delivery_information.shipping_address.city,
        order_district:
          checkOutResult.delivery_information.shipping_address.district,
        order_street:
          checkOutResult.delivery_information.shipping_address.street,
        user_id: user_id,
        discount_id: discount_id,
      });
      return newOrder;
    } catch (error) {
        console.error(error);
      throw new BadRequestError("Create order failed, please try again!");
    }
  };
}

module.exports = OrderService;
