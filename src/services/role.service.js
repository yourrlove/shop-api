'use strict';
const db = require('../models');
const { generateUUID } = require('../helpers/index');

class RoleService {
    static create = async ({ name }) => {
        const id = generateUUID();
        const role = await db.Role.create({ id, name });
        return role;
    }
    
    static delete = async ( id ) => {
        await db.Role.destroy({ where: { id: id } });
        return "success to delete role";
    }

    static get_all = async () => {
        const roles = await db.Role.findAll({ raw: true });
        return roles;
    }
}

module.exports = RoleService;