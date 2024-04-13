'use strict';
const db = require('../models');
const { generateUUID } = require('../helpers/index');

class UserService {
    static create = async ({ username, email, hash_password, role_name }) => {
        const { role_id }  = await db.Role.findOne({ 
            where : { name: role_name },
            attributes: [ ['id', 'role_id'] ],
            raw: true
        });
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
        const user = await db.User.update({ 
            username, 
            email, 
            hash_password,
            role_id
        }, {
            where: { id }
        });
        return user ? "updated user successfully" : "failed to update user";
    }

    static delete = async ( id ) => {
        const user = await db.User.destroy({
            where: { id }
        });
        return user ? "deleted user successfully" : "failed to delete user";
    }
}

module.exports = UserService;