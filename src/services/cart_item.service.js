"use strict";
const db = require("../models");
const { generateUUID } = require("../helpers/index");
const CartService = require("../services/cart.service");
const { NotFoundError, BadRequestError } = require("../core/error.response");

class CartItemService {
  // add product(s) to cart
  static create = async (user_id, { product_detail_id, quantity }) => {
    const cart = await db.Cart.findOne({
      where: {
        id: user_id,
      },
    });
    if (!cart) {
      throw new NotFoundError("User cart not found!");
    }
    const productDetail = await db.ProductDetail.findOne({
      where: {
        id: product_detail_id,
      },
    });

    if (!productDetail) {
      throw new NotFoundError("Product not found");
    }
    const [cartItem, created] = await db.CartItem.findOrCreate({
      where: {
        cart_id: cart.id,
        product_detail_id: product_detail_id,
      },
      defaults: {
        cart_id: cart.id,
        product_detail_id: product_detail_id,
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
  static updateQuantity = async (
    user_id,
    cart_id,
    { product_detail_id, quantity }
  ) => {
    if (user_id !== cart_id) {
      throw new BadRequestError("Unauthorized access");
    }
    const cart = await db.Cart.findOne({
      where: {
        id: cart_id,
      },
    });
    if (!cart) {
      throw new NotFoundError("User cart not found!");
    }
    const cartItem = await db.CartItem.findOne({
      where: {
        cart_id: cart_id,
        product_detail_id: product_detail_id,
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
    if (user_id !== cart_id) {
      throw new BadRequestError("Unauthorized access");
    }
    const cart = await db.Cart.findOne({
      where: {
        id: cart_id,
      },
    });

    if (!cart) {
      throw new NotFoundError("Cart Not found");
    }

    const cartitem = await db.CartItem.findAll({
      where: {
        cart_id: cart.id,
      },
      include: {
        model: db.ProductDetail,
        attributes: { exclude: ["deletedAt", "updatedAt", "createdAt"] },
        include: [
          {
            model: db.Product,
            attributes: ["name", "current_unit_price"],
            include: {
              model: db.Brand,
              attributes: ["name"],
            },
          },
          {
            model: db.Image,
            attributes: ["url"],
            where: {
                order: 0,
            },
            as: "images",
          },
          {
            model: db.Size,
            attributes: ["type", "quantity"],
            as: "size",
          },
        ],
      },
      require: true,
    });

    return cartitem;
  };

  static deleteCartItem = async (user_id, cart_id, product_detail_id) => {
    if (user_id !== cart_id) {
      throw new BadRequestError("Unauthorized access");
    }
    const cart = await db.Cart.findOne({
      where: {
        id: cart_id,
      },
    });
    if (!cart) {
      throw new NotFoundError("User cart not found!");
    }
    const cartItem = await db.CartItem.findOne({
      where: {
        cart_id: cart_id,
        product_detail_id: product_detail_id,
      },
    });
    if (!cartItem) {
      throw new NotFoundError("Cart item not found");
    }
    return await cartItem.destroy();
  };
}

module.exports = CartItemService;
