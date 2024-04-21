const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../helpers/index');
const BrandController = require('../controllers/brand.controller');

router.post('/', asyncHandler( BrandController.createBrand ));
router.get('/', asyncHandler( BrandController.getAllBrands ));
router.delete('/:id', asyncHandler( BrandController.deleteBrand ));
router.put('/:id', asyncHandler( BrandController.updateBrand ));

module.exports = router;