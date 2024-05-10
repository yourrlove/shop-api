const db = require('../models');
const { generateUUID } = require('../helpers/index');

class CartService {
    static get_all = async () => {
        const carts = await db.Cart.findAll({
            attributes: ['id', 'quantity','user_id'],
            raw: true
        });
        return carts;
    }

    static create = async (user_id) => {
        const cart = await db.Cart.create({
            id : user_id,
        })
        if (!cart) {
            throw new BadRequestError('Failed to create user cart');
        }
        return cart;
    }
}

module.exports = CartService;