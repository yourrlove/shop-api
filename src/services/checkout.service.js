const db = require("../models/index");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const ProductDetailService = require("./product_detail.service");
const DiscountService = require("./discount.service");
const DeliveryInforService = require("./delivery_infor.service");
const _ = require("lodash");

class CheckOutService {
  static checkOutReview = async ({
    cart_id,
    user_id,
    cart_items = [],
    discount_code,
  }) => {
    const user = await db.User.findByPk(user_id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const cart = await db.Cart.findOne({
      where: { cart_id: cart_id, user_id: user_id },
    });
    if (!cart) {
      throw new NotFoundError("Cart not found");
    }
    cart_items = await Promise.all(
      cart_items.map(async (item) => {
        const isValidItem = await db.CartItem.findOne({
          where: {
            cart_id: cart_id,
            sku_id: item.sku_id,
            quantity: item.quantity,
            "$ProductDetail.Product.product_price$": item.price
          },
          include: {
            model: db.ProductDetail,
            include: {
              model: db.Product,
            },
          },
          raw: true,
        });
        if (!isValidItem) {
          throw new NotFoundError("Cart item not valid");
        }
        return item;
      })
    );

    const CartCheckOut = {
      total_price: 0,
      discount_amount: 0,
      shipping_price: 0,
      final_price: 0,
    };

    // calculate the total price without discount
    CartCheckOut.total_price = cart_items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);


    if (discount_code) {
      ({
        discount_amount: CartCheckOut.discount_amount,
        discount_desc: CartCheckOut.discount_desc,
      } = await DiscountService.getDiscountAmount({
        discount_code,
        cart_items,
      }));
    }
    CartCheckOut.final_price = CartCheckOut.total_price - CartCheckOut.discount_amount;
    return CartCheckOut;
  };

  static checkOutReviewCart = async ({
    cart_id,
    user_id,
    cart_items = [],
    discount_code,
  }) => {
    return await this.checkOutReview({
      cart_id,
      user_id,
      cart_items,
      discount_code,
    });
  };

  static checkOutReviewOrder = async ({
    user_id,
    cart_id,
    cart_items,
    discount_code,
    delivery_information,
    payment_method,
  }) => {
    const checkoutResult = await this.checkOutReview({
      cart_id,
      user_id,
      cart_items,
      discount_code,
    });
    const user_infor = await db.User.findOne({
      where: { user_id: user_id },
      attributes: ["first_name", "last_name", "email", "phone_number"],
    });
    delivery_information.personal_detail = user_infor;
    if (!delivery_information.shipping_address) {
      const default_delivery_infor =
        await DeliveryInforService.getDeliveryDefault(user_id);
      delivery_information = default_delivery_infor;
    }

    if (payment_method === "Cash") {
      checkoutResult.shipping_price = 500000;
      checkoutResult.final_price += checkoutResult.shipping_price;
    }
    return {
     ...checkoutResult,
      delivery_information,
      payment_method,
    };
  };

  static checkOutDeliveryInformation = async (user_id) => {
    const personal_detail = await db.User.findOne({
      where: { user_id: user_id },
      attributes: ["first_name", "last_name", "email", "phone_number"],
    });
    if(!personal_detail) {
      throw new NotFoundError('User not found');
    }
    const shipping_address = await DeliveryInforService.getDeliveryDefault(user_id);
    return {
      personal_detail,
      shipping_address,
    };
  }
}

module.exports = CheckOutService;
