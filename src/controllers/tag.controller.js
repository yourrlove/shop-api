'use strict';
const { OK, CREATED } = require('../core/success.response');
const TagService = require('../services/tag.service');

class TagController {
    createTag = async (req, res, next) => {
        new CREATED({
            message: 'Tag created successfully',
            metadata: await TagService.create(req.body)
        }).send(res);
    }

    getAllTags = async (req, res, next) => {
        new OK({
            message: 'List of categories',
            metadata: await TagService.get_all()
        }).send(res);
    }

    updateTag = async (req, res, next) => {
        new OK({
            message: 'Tag updated successfully',
            metadata: await TagService.update(req.params.id, req.body)
        }).send(res);
    }

    deleteTag = async (req, res, next) => {
        new OK({
            message: 'Tag deleted successfully',
            metadata: await TagService.delete(req.params.id)
        }).send(res);
    }
}

module.exports = new TagController();