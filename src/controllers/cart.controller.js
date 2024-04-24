'use strict'
const CartService = require('../services/cart.service')
const CartItemService = require('../services/cart_item.service')
class CartController {
    get_list_carts = async(req, res, next) => {
        try{
            res.status(200).json(await CartService.get_all())
        }catch(err){
            res.status(500).json(err);
        }
    }
    
    add_to_cart = async (req, res, next) => {
        console.log(req.body)
        try {
            res.status(200).json(await CartItemService.create(req.params.id, req.body));
            
        } catch (err) {
            res.status(500).json({ error: err.message || "Internal Server Error" });
        }
    }

    create_cart = async (req, res, next) => {
        debugger
        try{
            res.status(201).json(await CartService.create(req.body))
        }catch(err){
            res.status(500).json({ error: err.message || "Internal Server Error" });
        }
    }

    update_cart = async (req, res, next) => {
        try{
            res.status(201).json(await CartItemService.updateQuantity(req.params.id, req.body))
        }catch(err){
            res.status(500).json({ error: err.message || "Internal Server Error" });
        }
    }

    delete_cart_item = async (req, res, next) => {
        try{
            res.status(201).json(await CartItemService.delete(req.params.id, req.body))
        }catch(err){
            res.status(500).json({ error: err.message || "Internal Server Error" });
        }
    }

    get_list_item = async (req, res, next) => {
        try{
            res.status(200).json(await CartItemService.get_all(req.params.id))
        }catch(err){
            res.status(500).json({ error: err.message || "Internal Server Error" });
        }
    }
}

module.exports = new CartController()