'use strict';
const UserService = require('../services/user.service');

class UserController {
    create_user = async (req, res, next) => {
        try {
            res.status(201).json(await UserService.create(req.body));
        } catch(err){
            res.status(500).json(err);
        }
    }

    get_list_users = async (req, res, next) => {
        try {
            res.status(200).json(await UserService.get_all());
        } catch(err){
            res.status(500).json(err);
        }
    }

    update_user = async (req, res, next) => {
        try {
            res.status(200).json(await UserService.update(req.params.id, req.body));
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    delete_user = async (req, res, next) => {
        try {
            res.status(200).json(await UserService.delete(req.params.id));
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new UserController();