// CommonJS
const PayOS = require("@payos/node");
const OrderService = require("./order.service");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { createHmac } = require("crypto");
const db = require("../models/index");
const axios = require("axios");

const payOS = new PayOS(
  process.env.CLIENT_ID,
  process.env.API_KEY,
  process.env.CHECKSUM_KEY
);

const {
  config: { WEB_DOMAIN_URL },
} = require("../constants/index");

class PaymentService {
  static createPaymentLink = async ({
    order_code,
    final_price,
    order_items,
  }) => {
    const body = {
      orderCode: order_code,
      amount: final_price,
      description: "Thanh toan don hang",
      items: order_items,
      cancelUrl: `http://localhost:5173/checkout/#success`,
      returnUrl: `http://localhost:5173/checkout/#failure`,
    };
    const response = await payOS.createPaymentLink(body);
    return response.checkoutUrl;
  };

  static handlePayOsHook = async (webhookData) => {
    const isValid = this.isValidData(
      webhookData.data,
      webhookData.signature,
      process.env.CHECKSUM_KEY
    );
    if (!isValid) {
      throw new BadRequestError("Invalid signature");
    }
    if ((webhookData.code === "00" || webhookData.desc === "success") && webhookData.data.status === "PAID") {
      const order = await db.Order.findOne({
        where: { order_code: webhookData.data.orderCode },
      });
      if (!order) {
        throw new NotFoundError("Order not found");
      }
      order.order_status = "confirmed";
      await order.save();
      return {
        success: true,
      };
    }
  };

  static sortObjDataByKey = (object) => {
    const orderedObject = Object.keys(object)
      .sort()
      .reduce((obj, key) => {
        obj[key] = object[key];
        return obj;
      }, {});
    return orderedObject;
  };

  static convertObjToQueryStr = (object) => {
    return Object.keys(object)
      .filter((key) => object[key] !== undefined)
      .map((key) => {
        let value = object[key];
        // Sort nested object
        if (value && Array.isArray(value)) {
          value = JSON.stringify(value.map((val) => sortObjDataByKey(val)));
        }
        // Set empty string if null
        if ([null, undefined, "undefined", "null"].includes(value)) {
          value = "";
        }

        return `${key}=${value}`;
      })
      .join("&");
  };

  static isValidData = (data, currentSignature, checksumKey) => {
    const sortedDataByKey = this.sortObjDataByKey(data);
    const dataQueryStr = this.convertObjToQueryStr(sortedDataByKey);
    const dataToSignature = createHmac("sha256", checksumKey)
      .update(dataQueryStr)
      .digest("hex");
    return dataToSignature == currentSignature;
  };

  static handleCancelled = async ({ id, orderCode }) => {
    try {
      const { data } = await axios.request(
        `https://api-merchant.payos.vn/v2/payment-requests/${id}`,
        {
          headers: {
            "x-api-key": process.env.API_KEY,
            "x-client-id": process.env.CLIENT_ID,
          },
        }
      );
      if (data.data.status === "CANCELLED") {
        const order = await db.Order.findOne({
          where: { order_code: data.data.orderCode },
        });
        if (!order) {
          throw new NotFoundError("Order not found");
        }
        const orderDetails = await db.OrderDetail.findAll({
          where: {
            order_id: order.order_id,
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
        order.order_status = "cancelled";
        return await order.save();
      }
    } catch (err) {
      console.log(err);
      throw new BadRequestError(err);
    }
  };
}

module.exports = PaymentService;
