'use strict';

const db = require('../models');
const { generateUUID } = require('../helpers/index');
const { BadRequestError, NotFoundError } = require('../core/error.response');


class RoleService {
    static create = async ({ name }) => {
        const id = generateUUID();
        const role = await db.Role.create({ id, name });
        return role;
    }
    
    static delete = async ( id ) => {
        const result = await db.Role.destroy({ where: { id: id } });
        if (result == 0) {
            throw new NotFoundError('Failed to delete role! Id Not Found!');
        }
    }

    static get_all = async () => {
        const roles = await db.Role.findAll({ raw: true });
        return roles;
    }
}

module.exports = RoleService;