'use strict';
const db = require('../models');
const { generateUUID } = require('../helpers/index');
const { BadRequestError } = require('../core/error.response');
const CartService = require('../services/cart.service');
const { includes } = require('lodash');

class UserService {
    static create = async ( userBody ) => {
        const user = await db.User.create({ 
            ...userBody,
        });
        if(!user) {
            throw new BadRequestError('Failed to create user! Something went wrong! Please try again!');
        }
        return user;
    }

    static get_all = async () => {
        const users = await db.User.findAll({ raw: true });
        return users;
    }

    static update = async ( id, { username, email, hash_password, role_name }) => {
        const { role_id }  = await db.Role.findOne({ 
            where : { name: role_name },
            attributes: [ ['id', 'role_id'] ],
            raw: true
        });
        if (!role_id) throw new BadRequestError('role id not found');
        const user = await db.User.update({ 
            username, 
            email, 
            hash_password,
            role_id
        }, {
            where: { id }
        });
        if(!user) throw new BadRequestError('failed to update user');
        return user;
    }

    static delete = async ( id ) => {
        const user = await db.User.destroy({
            where: { id }
        });
        if(!user) throw new BadRequestError('failed to delete user');
        return user;
    }

    static get_basic_infor = async (user_id) => {
        //Username
        const { first_name, last_name } = await db.User.findOne({id: user_id});
        // Cart
        const cartInfor = await db.Cart.findAll({
            where: {
                id: user_id
            },
            include: {
                model: db.CartItem,
                attributes: ['product_detail_id'],
                include: {
                    model: db.ProductDetail,
                    attributes: ['description'],
                    include: [
                        {
                            model: db.Product,
                            attributes: ['current_unit_price'],
                        },
                        {
                            model: db.Image,
                            attributes: ['url'],
                            where: {
                                order: 0
                            },
                            as: 'images',
                        }
                    ]
                }
            },
            require: true
        })
        //Notifications
        //

        return {
            name: first_name + ' ' + last_name,
            cart: cartInfor
        }
    }
}

module.exports = UserService;