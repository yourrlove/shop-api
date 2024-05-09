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
        const id = generateUUID();
        const cart = await db.Cart.create({
            id : id,
            user_id: user_id,
        })
        return cart;
    }
}

module.exports = CartService;