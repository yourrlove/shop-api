"use strict";
const db = require("../models");
const { generateUUID } = require("../helpers/index");
const CartService = require("../services/cart.service");
const { NotFoundError, BadRequestError } = require("../core/error.response");

class CartItemService {
  // add product(s) to cart
  static create = async (user_id, { sku_id, product_id, quantity }) => {
    const user = await db.User.findOne({ user_id: user_id });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    let cart = await db.Cart.findOne({
      where: {
        user_id: user_id,
      },
    });
    if (!cart) {
      cart = await CartService.create(user_id);
    }
    if (!cart) throw new BadRequestError("Failed to create cart");
    const productDetail = await db.ProductDetail.findOne({
      where: {
        product_id: product_id,
        sku_id: sku_id,
      },
    });

    if (!productDetail) {
      throw new NotFoundError("Product not found");
    }
    const [cartItem, created] = await db.CartItem.findOrCreate({
      where: {
        cart_id: cart.cart_id,
        sku_id: sku_id,
      },
      defaults: {
        cart_id: cart.cart_id,
        sku_id: sku_id,
        product_id: product_id,
        quantity: quantity,
      },
    });

    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }
    return cartItem;
  };

  // update product(s) from cart
  static updateQuantity = async (user_id, cart_id, { sku_id, quantity }) => {
    if (quantity === 0) {
      return await this.deleteCartItem(user_id, cart_id, sku_id);
    }
    const user = await db.User.findOne({ id: user_id });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const cart = await db.Cart.findOne({
      where: {
        cart_id: cart_id,
      },
    });
    if (!cart) {
      throw new NotFoundError("User cart not found!");
    }
    const cartItem = await db.CartItem.findOne({
      where: {
        cart_id: cart_id,
        sku_id: sku_id,
      },
    });
    if (!cartItem) {
      throw new NotFoundError("Cart item not found");
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    return cartItem;
  };

  // get all product from cart
  static get_all = async (user_id, cart_id) => {
    const cart = await db.Cart.findOne({
      where: {
        cart_id: cart_id,
      },
    });

    if (!cart) {
      throw new NotFoundError("Cart Not found");
    }

    const cartitem = await db.CartItem.findAll({
      where: {
        cart_id: cart.cart_id,
      },
      include: {
        model: db.ProductDetail,
        attributes: { exclude: ["deletedAt", "updatedAt", "createdAt"] },
        include: {
          model: db.Product,
          attributes: ["product_name", "product_price"],
          include: {
            model: db.Brand,
            attributes: ["name"],
          },
        },
      },
      require: true,
    });

    return cartitem;
  };

  static deleteCartItem = async (user_id, cart_id, sku_id) => {
    const user = await db.User.findOne({user_id: user_id});
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const cart = await db.Cart.findOne({
      where: {
        cart_id: cart_id,
      },
    });
    if (!cart) {
      throw new NotFoundError("User cart not found!");
    }
    const cartItem = await db.CartItem.findOne({
      where: {
        cart_id: cart_id,
        sku_id: sku_id,
      },
    });
    if (!cartItem) {
      throw new NotFoundError("Cart item not found");
    }
    return await cartItem.destroy();
  };
}

module.exports = CartItemService;
