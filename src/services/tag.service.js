'use strict';
const { generateUUID } = require('../helpers/index');
const { NotFoundError } = require('../core/error.response');
const db = require('../models/index');

class TagService {
    static create = async ({ name }) => {
        const tag_id = generateUUID();
        const tag = await db.Tag.create({ tag_id, name });
        return tag;
    }

    static get_all = async () => {
        return await db.Tag.findAll({ raw: true });
    }

    static update = async ( id, { name }) => {
        const tag = await db.Tag.update({ name }, {where: { tag_id: id }});
        if (!tag[0]) throw new NotFoundError('Tag not found');
        return tag;
    }

    static delete = async (id) => {
        const result = await db.Tag.destroy({ where: { tag_id: id }});
        if(!result) throw new NotFoundError(`Tag not found`);
        return result;
    }

    static is_exists = async (id) => {
        return await db.Tag.findByPk(id);
    }

    static get_id_by_name = async (name) => {
        const { tag_id } = await db.Tag.findOne({ where: { name: name }, raw: true });
        return id;
    }
}

module.exports = TagService;