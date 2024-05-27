'use strict';
const { where } = require('sequelize');
const { generateUUID } = require('../helpers/index');
const db = require('../models/index');
const { NotFoundError } = require('../core/error.response');

class BrandService {
    static create = async ({ name, logo, description, code }) => {
        const brand_id = generateUUID();
        const brand = await db.Brand.create({ brand_id, name, logo, description, code });
        return brand;
    }

    static get_all = async () => {
        return await db.Brand.findAll({ raw: true });
    }

    static update = async ( id, { name, logo, description }) => {
        const brand = await db.Brand.update({ name, logo, description }, {where: { brand_id: brand_id }});
        if(!brand[0]) throw new NotFoundError('Brand not found');
        return brand;
    }

    static delete = async (id) => {
        const result = await db.Brand.destroy({ where: { brand_id: brand_id }});
        if(!result) throw new NotFoundError(`Brand not found`);
        return result;
    }

    static is_exists = async (id) => { 
        return await db.Brand.findByPk(id);
    }

    static get_id_by_name = async (name) => {
        const { brand_id } = await db.Brand.findOne({ where: { name: name }, raw: true });
        return brand_id;
    }
}

module.exports = BrandService;