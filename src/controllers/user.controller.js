'use strict';

const { OK, CREATED } = require('../core/success.response');
const UserService = require('../services/user.service');

class UserController {
    create_user = async (req, res, next) => {
        new CREATED({
            message: 'User created successfully',
            metadata: await UserService.create(req.body)
        }).send(res);
    }

    get_list_users = async (req, res, next) => {
        new OK({
            message: 'Users retrieved successfully',
            metadata: await UserService.get_all()
        }).send(res);
    }

    update_user = async (req, res, next) => {
        new OK({
            message: 'Users updated successfully',
            metadata: await UserService.update(req.params.id, req.body)
        }).send(res);
    }

    delete_user = async (req, res, next) => {
        new OK({
            message: 'Users deleted successfully',
            metadata: await UserService.delete(req.params.id)
        }).send(res);
    }
}

module.exports = new UserController();