'use strict';
const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../helpers/index');
const CatalogueController = require('../../controllers/catalogue.controller');

router.get('/', asyncHandler( CatalogueController.getAllCatalogues ));
router.post('/', asyncHandler( CatalogueController.createCatalogue ));
router.put('/:id', asyncHandler( CatalogueController.updateCatalogue ));
router.delete('/:id', asyncHandler( CatalogueController.deleteCatalogue ));

module.exports = router;