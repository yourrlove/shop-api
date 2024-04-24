'use strict';
const db = require('../models');
const { generateUUID } = require('../helpers/index');
const { BadRequestError } = require('../core/error.response');

class UserService {
    static create = async ({ username, email, hash_password, role_name }) => {
        const { role_id }  = await db.Role.findOne({ 
            where : { name: role_name },
            attributes: [ ['id', 'role_id'] ],
            raw: true
        });
        if (!role_id) throw new BadRequestError('role id not found');
        const id = generateUUID();
        const user = await db.User.create({ 
            id,
            username, 
            email, 
            hash_password,
            role_id
        });
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
}

module.exports = UserService;