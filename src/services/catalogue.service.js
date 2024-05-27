'use strict';
const { generateUUID } = require('../helpers/index');
const { NotFoundError } = require('../core/error.response');
const db = require('../models/index');

class CatalogueService {
    static create = async ({ name, code }) => {
        const catalogue_id = generateUUID();
        const catalogue = await db.Catalogue.create({ catalogue_id, name, code });
        return catalogue;
    }

    static get_all = async () => {
        return await db.Catalogue.findAll({ raw: true });
    }

    static update = async ( id, { name }) => {
        const catalogue = await db.Catalogue.update({ name }, {where: { catalogue_id: id }});
        if (!catalogue[0]) throw new NotFoundError('Catalogue not found');
        return catalogue;
    }

    static delete = async (id) => {
        const result = await db.Catalogue.destroy({ where: { catalogue_id: id }});
        if(!result) throw new NotFoundError(`Catalogue not found`);
        return result;
    }

    static is_exists = async (id) => {
        return await db.Catalogue.findByPk(id);
    }

    static get_id_by_name = async (name) => {
        const { catalogue_id } = await db.Catalogue.findOne({ where: { name: name }, raw: true });
        return catalogue_id;
    }
}

module.exports = CatalogueService;