'use strict'
const CartService = require('../services/cart.service')
const CartItemService = require('../services/cart_item.service')
const { OK, CREATED } = require('../core/success.response');

class CartController {
    get_list_carts = async(req, res, next) => {
        new OK ({
            message: "List users' carts",
            metadata: await CartService.get_all()
        }).send(res)
    }
    
    add_to_cart = async (req, res, next) => {
        new CREATED ({
            message: "CartItem is added successfully",
            metadata: await CartItemService.create(req.params.id, req.body)
        }).send(res)
    }

    create_cart = async (req, res, next) => {
        new CREATED({
            message: "Cart created successfully",
            metadata: await CartService.create(req.body)
        }).send(res);
    }

    update_cart = async (req, res, next) => {
        new OK({
            message: "Cart updated successfully",
            metadata: await CartItemService.updateQuantity(req.params.id, req.body)
        }).send(res);
        
    }

    delete_cart_item = async (req, res, next) => {
        new OK({
            message: "Cart item deleted successfully",
            metadata: await CartItemService.delete(req.params.id, req.body)
        }).send(res);  
    }

    get_list_item = async (req, res, next) => {
        new OK({
            message: "List items in cart",
            metadata: await CartItemService.get_all(req.params.id)
        }).send(res);
    }
}

module.exports = new CartController()