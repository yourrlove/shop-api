'use strict';
const { OK, CREATED } = require('../core/success.response');
const CatalogueService = require('../services/catalogue.service');

class CatalogueController {
    createCatalogue = async (req, res, next) => {
        new CREATED({
            message: 'Catalogue created successfully',
            metadata: await CatalogueService.create(req.body)
        }).send(res);
    }

    getAllCatalogues = async (req, res, next) => {
        new OK({
            message: 'List of categories',
            metadata: await CatalogueService.get_all()
        }).send(res);
    }

    updateCatalogue = async (req, res, next) => {
        new OK({
            message: 'Catalogue updated successfully',
            metadata: await CatalogueService.update(req.params.id, req.body)
        }).send(res);
    }

    deleteCatalogue = async (req, res, next) => {
        new OK({
            message: 'Catalogue deleted successfully',
            metadata: await CatalogueService.delete(req.params.id)
        }).send(res);
    }
}

module.exports = new CatalogueController();