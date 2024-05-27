"use strict";
const CartService = require("../services/cart.service");
const CartItemService = require("../services/cart_item.service");
const CheckOutService = require("../services/checkout.service");
const { OK, CREATED } = require("../core/success.response");

class CartController {
  add_to_cart = async (req, res, next) => {
    new CREATED({
      message: "CartItem is added successfully",
      metadata: await CartItemService.create(req.user.user_id, req.body),
    }).send(res);
  };

  update_cart = async (req, res, next) => {
    new OK({
      message: "Cart updated successfully",
      metadata: await CartItemService.updateQuantity(
        req.user.user_id,
        req.params.cartId,
        req.body
      ),
    }).send(res);
  };

  delete_cart_item = async (req, res, next) => {
    new OK({
      message: "Cart item deleted successfully",
      metadata: await CartItemService.deleteCartItem(
        req.user.user_id,
        req.params.cartId,
        req.params.productdetailId
      ),
    }).send(res);
  };

  get_list_item = async (req, res, next) => {
    new OK({
      message: "List items in cart",
      metadata: await CartItemService.get_all(req.user.user_id, req.params.id),
    }).send(res);
  };

  CheckOutReviewCart = async (req, res, next) => {
    new OK({
      message: "Check out review in cart",
      metadata: await CheckOutService.checkOutReviewCart({
        ...req.body,
        cart_id: req.params.cart_id,
        user_id: req.user.user_id,
      }),
    }).send(res);
  };
}

module.exports = new CartController();
