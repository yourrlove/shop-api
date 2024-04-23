'use strict';
const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../helpers/index');
const CategoryController = require('../../controllers/category.controller');

router.get('/', asyncHandler( CategoryController.getAllCategories ));
router.post('/', asyncHandler( CategoryController.createCategory ));
router.put('/:id', asyncHandler( CategoryController.updateCategory ));
router.delete('/:id', asyncHandler( CategoryController.deleteCategory ));

module.exports = router;