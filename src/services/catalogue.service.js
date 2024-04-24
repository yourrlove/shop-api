'use strict';
const { generateUUID } = require('../helpers/index');
const { NotFoundError } = require('../core/error.response');
const db = require('../models/index');

class CatalogueService {
    static create = async ({ name }) => {
        const id = generateUUID();
        const category = await db.Catalogue.create({ id, name });
        return category;
    }

    static get_all = async () => {
        return await db.Catalogue.findAll({ raw: true });
    }

    static update = async ( id, { name }) => {
        const category = await db.Catalogue.update({ name }, {where: { id: id }});
        if (!category[0]) throw new NotFoundError('Catalogue not found');
        return category;
    }

    static delete = async (id) => {
        const result = await db.Catalogue.destroy({ where: { id: id }});
        if(!result) throw new NotFoundError(`Catalogue not found`);
        return result;
    }

    static is_exists = async (id) => {
        return await db.Catalogue.findByPk(id);
    }

    static get_id_by_name = async (name) => {
        const { id } = await db.Catalogue.findOne({ where: { name: name }, raw: true });
        return id;
    }
}

module.exports = CatalogueService;