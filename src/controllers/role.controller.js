'use strict';
const { OK, CREATED, NO_CONTENT } = require('../core/success.response');
const RoleService = require('../services/role.service');


class RoleController {
    create_role = async (req, res, next) => {
        new CREATED({
            message: 'Role created successfully!',
            metadata: await RoleService.create(req.body)
        }).send(res);
    }

    delete_role = async (req, res, next) => {
        new OK({
            message: 'Role deleted successfully!',
            metadata: await RoleService.delete(req.params.id)
        }).send(res);
    }

    get_list_roles = async (req, res, next) => {
        new OK({
            message: 'List Roles retrieved successfully!',
            metadata: await RoleService.get_all()
        }).send(res); 
    }
}

module.exports = new RoleController();