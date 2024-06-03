'use strict';
const db = require('../models');
const { generateUUID } = require('../helpers/index');
const { BadRequestError } = require('../core/error.response');
const CartService = require('../services/cart.service');
const { includes } = require('lodash');

class UserService {
    static create = async ({ user_id, first_name, last_name, email, hash_password, phone_number, role_name="user" }) => { // t sửa password thành hash_password để test
        const { role_id }  = await db.Role.findOne({ 
            where : { name: role_name },
            attributes: ['role_id'],
            raw: true
        });
        if (!role_id) throw new BadRequestError('role id not found');
        const user = await db.User.create({ 
            user_id: user_id,
            first_name,
            last_name,
            email,
            hash_password,
            phone_number,
            role_id,
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
        const { first_name, last_name } = await db.User.findOne({user_id: user_id});
        // Cart
        const cartInfor = await db.Cart.findOne({
            where: {
                user_id: user_id
            },
            include: {
                model: db.CartItem,
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

    static getUserDetails = async (user_id, fields=[]) => {
        const user = await db.User.findOne({
            where: {
                user_id: user_id
            },
            attributes: fields,
            raw: true
        });
        if (!user) throw new BadRequestError('User not found');
        return user;
    }
}

module.exports = UserService;