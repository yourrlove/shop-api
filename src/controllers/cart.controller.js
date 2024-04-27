'use strict'
const CartService = require('../services/cart.service')
const CartItemService = require('../services/cart_item.service')
const { OK, CREATED } = require('../core/success.response');

class CartController {
    get_list_carts = async(req, res, next) => {
        try{
            new OK ({
                message: "List users' carts",
                metadata: await CartService.get_all()
            }).send(res)
        }catch(err){
            res.status(500).json(err);
        }
    }
    
    add_to_cart = async (req, res, next) => {
        console.log(req.body)
        try {
            new CREATED ({
                message: "CartItem is added successfully",
                metadata: await await CartItemService.create(req.params.id, req.body)
            }).send(res)
        } catch (err) {
            res.status(500).json({ error: err.message || "Internal Server Error" });
        }
    }

    create_cart = async (req, res, next) => {
        debugger;
        try {
            const newCart = await CartService.create(req.body);
            new CREATED({
                message: "Cart created successfully",
                metadata: newCart
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message || "Internal Server Error" });
        }
    }

    update_cart = async (req, res, next) => {
        try {
            const updatedItem = await CartItemService.updateQuantity(req.params.id, req.body);
            new OK({
                message: "Cart updated successfully",
                metadata: updatedItem
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message || "Internal Server Error" });
        }
    }

    delete_cart_item = async (req, res, next) => {
        try {
            const deletedItem = await CartItemService.delete(req.params.id, req.body);
            new OK({
                message: "Cart item deleted successfully",
                metadata: deletedItem
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message || "Internal Server Error" });
        }
    }

    get_list_item = async (req, res, next) => {
        try {
            const items = await CartItemService.get_all(req.params.id);
            new OK({
                message: "List items in cart",
                metadata: items
            }).send(res);
        } catch (err) {
            res.status(500).json({ error: err.message || "Internal Server Error" });
        }
    }
}

module.exports = new CartController()