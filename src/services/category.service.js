'use strict';
const { generateUUID } = require('../helpers/index');
const { NotFoundError } = require('../core/error.response');
const db = require('../models/index');

class CategoryService {
    static create = async ({ name, description }) => {
        const id = generateUUID();
        const category = await db.Category.create({ id, name, description });
        return category;
    }

    static get_all = async () => {
        return await db.Category.findAll({ raw: true });
    }

    static update = async ( id, { name, description }) => {
        const category = await db.Category.update({ name, description }, {where: { id: id }});
        if (!category[0]) throw new NotFoundError('Category not found');
        return category;
    }

    static delete = async (id) => {
        const result = await db.Category.destroy({ where: { id: id }});
        if(!result) throw new NotFoundError(`Category not found`);
        return result;
    }

    static is_exists = async (id) => {
        return await db.Category.findByPk(id);
    }

    static get_id_by_name = async (name) => {
        const { id } = await db.Category.findOne({ where: { name: name }, raw: true });
        return id;
    }
}

module.exports = CategoryService;