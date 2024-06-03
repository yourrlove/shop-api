"use strict";
const db = require("../models/index");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { generateUUID } = require("../helpers/index");
const DeliveryInforService = require("./delivery_infor.service");
const CheckOutService = require("./checkout.service");
const { checkRequestParams } = require("../utils/index");
const order = require("../models/order");
const ProductDetailService = require("./product_detail.service");
const PaymentService = require("./payment.service");

class OrderService {
  static create = async ({
    user_id,
    cart_id,
    cart_items,
    discount_code,
    delivery_information,
    payment_method,
  }) => {
    checkRequestParams({
      discount_code,
      ...delivery_information.shipping_address,
      ...delivery_information.personal_detail,
      payment_method,
    });

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
    let discountId = null;
    if (discount_code !== null) {
      const { discount_id } = await db.Discount.findOne({
        where: {
          discount_code: discount_code,
          discount_is_active: true,
        },
        attributes: ["discount_id"],
        raw: true,
      });
      discountId = discount_id;
    }

    try {
      const newOrder = await db.Order.create({
        order_id: generateUUID(),
        order_total_price: checkOutResult.total_price,
        order_discount_amount: checkOutResult.discount_amount,
        order_shipping_price: checkOutResult.shipping_price,
        order_final_price: checkOutResult.final_price,
        order_payment_method: checkOutResult.payment_method,
        order_province_city:
          checkOutResult.delivery_information.shipping_address.province_city,
        order_district:
          checkOutResult.delivery_information.shipping_address.district,
        order_ward: checkOutResult.delivery_information.shipping_address.ward,
        order_street:
          checkOutResult.delivery_information.shipping_address.street,
        order_code: Date.now(),
        user_id: user_id,
        discount_id: discountId,
      });

      // create orderDetails
      const order_details = await Promise.all(
        cart_items.map(async (item) => {
          const product = await db.ProductDetail.findByPk(item.sku_id);
          if (
            product.sku_quantity > 0 &&
            product.sku_quantity > item.quantity
          ) {
            const order_item = await db.OrderDetail.create({
              order_id: newOrder.order_id,
              sku_id: item.sku_id,
              quantity: item.quantity,
              order_detail_price: item.price,
              order_detail_quantity: item.quantity,
            });

            product.sku_quantity =
              product.sku_quantity - order.order_detail_quantity;
            await product.save();
            return order_item;
          }
        })
      );

      let order_items = [];

      // remove cart items
      await Promise.all(
        cart_items.map(async (item) => {
          const product = await db.ProductDetail.findOne({
            where: {
              sku_id: item.sku_id,
            },
            include: {
              model: db.Product,
            },
          });
          order_items.push({
            name: `${product.Product.product_name} - ${product.sku_color} - ${product.sku_size}`,
            price: item.price,
            quantity: item.quantity,
          });
          await db.CartItem.destroy({
            where: {
              cart_id: cart_id,
              sku_id: item.sku_id,
            },
          });
        })
      );

      if (payment_method === "Bank Transfer") {
        const checkoutUrl = await PaymentService.createPaymentLink({
          order_code: newOrder.order_code,
          final_price: newOrder.order_final_price,
          order_items: order_items,
        });
        return checkoutUrl;
      }

      return newOrder;
    } catch (error) {
      throw new BadRequestError(error.errors[0].message);
    }
  };

  static getUserOrders = async (
    user_id,
    { sortBy = ["updatedAt", "DESC"] }
  ) => {
    checkRequestParams({
      sortBy,
    });
    const orders = await db.Order.findAll({
      where: { user_id: user_id },
      attributes: [
        "order_id",
        "order_final_price",
        "order_status",
        "order_payment_status",
        "order_payment_method",
        "order_code",
        "updatedAt",
      ],
      order: [sortBy],
    });
    return orders;
  };

  static getAllOrders = async () => {
    const orders = await db.Order.findAll({
      attributes: [
        "order_id",
        "order_final_price",
        "order_shipping_price",
        "order_discount_amount",
        "order_status",
        "order_payment_status",
        "order_payment_method",
        "order_code",
        "createdAt",
        "updatedAt",
      ],
      include: {
        model: db.User,
        attributes: [
          "user_id",
          "email",
          "first_name",
          "last_name",
          "phone_number",
        ],
      },
    });
    return orders;
  };

  static updateStatus = async (order_id, { status }) => {
    const order = await db.Order.findByPk(order_id);
    if (!order) {
      throw new NotFoundError("Order not found");
    }
    if (status === "Cancelled") {
      const orderDetails = await db.OrderDetail.findAll({
        where: {
          order_id: order_id,
        },
        raw: true,
      });
      await Promise.all(
        orderDetails.map(async (item) => {
          const product = await db.ProductDetail.findByPk(item.sku_id);
          product.sku_quantity =
            product.sku_quantity + item.order_detail_quantity;
          return await product.save();
        })
      );
    }
    order.order_status = status;
    return await order.save();
  };

  static getOrderDetail = async (user_id, order_id) => {
    const order = await db.Order.findOne({
      where: {
        order_id: order_id,
        user_id: user_id,
      },
      attributes: { exclude: ["updatedAt"] },
      include: {
        model: db.Discount,
        attributes: ["discount_value", "discount_desc"],
      },
    });
    if (!order) {
      throw new NotFoundError("Order not found");
    }
    const orderDetails = await db.OrderDetail.findAll({
      where: {
        order_id: order_id,
      },
      include: [
        {
          model: db.ProductDetail,
          attributes: [
            "sku_no",
            "sku_color",
            "sku_color",
            "sku_size",
            "sku_image",
          ],
          include: [
            {
              model: db.Product,
              attributes: ["product_id", "product_name", "product_price"],
              include: [
                {
                  model: db.Brand,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    });

    return { order, orderDetails };
  };

  static getOrderDetailAdmin = async (order_id) => {
    const order = await db.Order.findOne({
      where: {
        order_id: order_id,
      },
      attributes: { exclude: ["updatedAt"] },
      include: {
        model: db.Discount,
        attributes: ["discount_value", "discount_desc"],
      },
    });
    if (!order) {
      throw new NotFoundError("Order not found");
    }
    const orderDetails = await db.OrderDetail.findAll({
      where: {
        order_id: order_id,
      },
      include: [
        {
          model: db.ProductDetail,
          attributes: [
            "sku_no",
            "sku_color",
            "sku_color",
            "sku_size",
            "sku_image",
          ],
          include: [
            {
              model: db.Product,
              attributes: ["product_id", "product_name", "product_price"],
              include: [
                {
                  model: db.Brand,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    });

    return { order, orderDetails };
  };
}

module.exports = OrderService;
