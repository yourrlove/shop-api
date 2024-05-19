const db = require("../models/index");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const ProductDetailService = require("./product_detail.service");
const DiscountService = require("./discount.service");

class CheckOutService {
  static checkOutReviewCart = async ({
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
        const { sku_price } = await ProductDetailService.getSkuDetails(
          item.sku_id,
          ["sku_price"]
        );
        return { ...item, sku_price };
      })
    );

    const CartCheckOut = {
      total_price: 0,
    };

    // calculate the total price without discount
    CartCheckOut.total_price = cart_items.reduce((sum, item) => {
      return sum + item.sku_price * item.quantity;
    }, 0);

    if (discount_code) {
      ({
        discount_amount: CartCheckOut.discount_amount,
        discount_desc: CartCheckOut.discount_desc,
      } = await DiscountService.getDiscountAmount({
        discount_code,
        cart_items,
      }));
      CartCheckOut.final_price =
        CartCheckOut.total_price - CartCheckOut.discount_amount;
    }
    return CartCheckOut;
  };
}

module.exports = CheckOutService;
