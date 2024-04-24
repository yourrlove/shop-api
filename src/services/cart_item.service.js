'use strict'
const db = require('../models');
const { generateUUID } = require('../helpers/index');
const { where } = require('sequelize');
const CartService = require('../services/cart.service')

class CartItemService {
    // add product(s) to cart
    static create = async (product_detail_id, { user_id, quantity }) => {
        console.log(product_detail_id)
        try {
            let cart = await db.Cart.findOne({
                where: {
                    user_id: user_id
                }
            });
            console.log(cart)

            if (!cart) {
                cart = await CartService.create(user_id);
            }

            const productDetail = await db.ProductDetail.findOne({
                where: {
                    id: product_detail_id
                }
            });
    
            if (!productDetail) {
                throw new Error("Product not found");
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
        } catch (err) {
            return err; 
        }
    }

    // update product(s) from cart
    static updateQuantity = async (product_detail_id, {cart_id, quantity}) => {
        try {   
            
            const cartItem = await db.CartItem.findOne({
                where: {
                    cart_id: cart_id,
                    product_detail_id: product_detail_id
                }
            });

            if (!cartItem) {
                throw new Error("CartItem item not found");
            }
            cartItem.quantity = quantity;
            await cartItem.save();
    
            return cartItem;
        } catch (err) {
            return err;
        }
    }
    
    // get all product from cart
    static get_all = async (user_id) => {
        console.log(user_id)
        try{
            const cart = await db.Cart.findOne({
                where: {
                    user_id: user_id
                }
            })

            if(!cart){
                throw new Error("Not found");
            }

            const cartitem = await db.CartItem.findAll({
                where: {
                    cart_id: cart.id
                }
            })

            return cartitem;
        }catch(err){
            return err;
        }
    }

    static delete = async (product_detail_id, {cart_id}) => {
        try {
            const cartItem = await db.CartItem.findOne({
                where: {
                    cart_id: cart_id,
                    product_detail_id: product_detail_id
                }
            });
    
            if (!cartItem) {
                throw new Error("Cart item not found");
            }
    
            await cartItem.destroy();
    
            return "Cart item deleted successfully";
        } catch (err) {
            return err;
        }
    }
}

module.exports = CartItemService;