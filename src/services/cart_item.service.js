'use strict'
const db = require('../models');
const { generateUUID } = require('../helpers/index');
const CartService = require('../services/cart.service')
const { NotFoundError } = require('../core/error.response');

class CartItemService {
    // add product(s) to cart
    static create = async (product_detail_id, {user_id, quantity }) => {
        let cart = await db.Cart.findOne({
            where: {
                user_id: user_id
            }
        });
        if (!cart) {
            cart = await CartService.create(user_id);
        }
        const productDetail = await db.ProductDetail.findOne({
            where: {
                id: product_detail_id
            }
        });

        if (!productDetail) {
            throw new NotFoundError("Product not found");
        }
        let cartDetail = await db.CartItem.findOne({
            where: {
                cart_id: cart.id,
                product_detail_id: product_detail_id
            }
        });

        if (cartDetail) {
            cartDetail.quantity += quantity;
            await cartDetail.save();
        } else {
            cartDetail = await db.CartItem.create({
                cart_id: cart.id,
                product_detail_id: product_detail_id,
                quantity: quantity
            });
        }

        return cartDetail;
    }

    // update product(s) from cart
    static updateQuantity = async (product_detail_id, {cart_id, quantity}) => {
        const cartItem = await db.CartItem.findOne({
            where: {
                cart_id: cart_id,
                product_detail_id: product_detail_id
            }
        });

        if (!cartItem) {
            throw new NotFoundError("CartItem item not found");
        }
        cartItem.quantity = quantity;
        await cartItem.save();

        return cartItem;
    }
    
    // get all product from cart
    static get_all = async (user_id) => {
        const cart = await db.Cart.findOne({
            where: {
                user_id: user_id
            }
        })

        if(!cart){
            throw new NotFoundError("Cart Not found");
        }

        const cartitem = await db.CartItem.findAll({
            where: {
                cart_id: cart.id
            }
        })

        return cartitem;
    }

    static delete = async (product_detail_id, {cart_id}) => {
        const cartItem = await db.CartItem.findOne({
            where: {
                cart_id: cart_id,
                product_detail_id: product_detail_id
            }
        });

        if (!cartItem) {
            throw new NotFoundError("Cart item not found");
        }

        await cartItem.destroy();

        return "Cart item deleted successfully";
    }

}

module.exports = CartItemService;