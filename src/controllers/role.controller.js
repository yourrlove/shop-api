'use strict';
const RoleService = require('../services/role.service');


class RoleController {
    create_role = async (req, res, next) => {
        try{
            res.status(201).json(await RoleService.create(req.body));
        } catch(err){
            res.status(500).json(err.errors);
        }
    }

    delete_role = async (req, res, next) => {
        try {
            res.status(200).json(await RoleService.delete(req.query.id));
        } catch(err){
            res.status(500).json(err);
        }
    }

    get_list_roles = async (req, res, next) => {
        try {
            res.status(200).json(await RoleService.get_all());
        } catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new RoleController();