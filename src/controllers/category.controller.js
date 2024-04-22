'use strict';
const { OK, CREATED } = require('../core/success.response');
const CategoryService = require('../services/category.service');

class CategoryController {
    createCategory = async (req, res, next) => {
        new CREATED({
            message: 'Category created successfully',
            metadata: await CategoryService.create(req.body)
        }).send(res);
    }

    getAllCategories = async (req, res, next) => {
        new OK({
            message: 'List of categories',
            metadata: await CategoryService.get_all()
        }).send(res);
    }

    updateCategory = async (req, res, next) => {
        new OK({
            message: 'Category updated successfully',
            metadata: await CategoryService.update(req.params.id, req.body)
        }).send(res);
    }

    deleteCategory = async (req, res, next) => {
        new OK({
            message: 'Category deleted successfully',
            metadata: await CategoryService.delete(req.params.id)
        }).send(res);
    }
}

module.exports = new CategoryController();