const db = require('../models');
const { generateUUID } = require('../helpers/index');

class CartService {
    static get_all = async () => {
        const carts = await db.Cart.findAll({
            raw: true
        });
        return carts;
    }

    static create = async (user_id) => {
        const id = generateUUID();
        const cart = await db.Cart.create({
            cart_id: id,
            user_id : user_id,
        })
        if (!cart) {
            throw new BadRequestError('Failed to create user cart');
        }
        return cart;
    }

}

module.exports = CartService;