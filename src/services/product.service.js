'use strict';
const db = require('../models/index');
const { generateUUID } = require('../helpers/index');
const { BadRequestError, NotFoundError } = require('../core/error.response');
const BrandService = require('./brand.service');
const CategoryService = require('./category.service');
const { formatKeys, getInfoData, removeNull } = require('../utils/index');
const { Op } = require('sequelize');


class ProductService {
    static create = async ({ name, description, quantity, status, current_unit_price, thumbnail, brand_id, category_id }) => {
        
        const isBrandIdExist = BrandService.is_exists(brand_id);
        if(!isBrandIdExist) throw new BadRequestError(`Brand id not found!`);

        const id = generateUUID();
        const product = await db.Product.create({ 
            id,
            name,
            description,
            quantity,
            status,
            current_unit_price,
            thumbnail,
            brand_id,
            category_id
        });
        return product;
    }

    static get_all = async ( ) => {
        const products = await db.Product.findAll ({ 
            attributes: { exclude: ['brand_id', 'category_id'] },
            include: [
                {
                    model: db.Brand,
                    required: true,
                },
                {
                    model: db.Category,
                    required: true,
                }
            ],
            nest: true,
            raw: true
        });
        return products;
    }

    static update = async ( id, body) => {
        const product = await db.Product.update({
            ...body
        }, {
            where: {id : id}
        });
        if(!product[0]) throw new NotFoundError(`Product not found`);
        return product;
    }
    
    static delete = async ( id ) => {
        const product = await db.Product.destroy({ where: { id: id } });
        if(!product) throw new NotFoundError(`Product not found`);
        return product;
    }

    static get_by_brand_id = async ( brand_id ) => {
        const isBrandIdExist = BrandService.is_exists(brand_id);
        if(!isBrandIdExist) throw new BadRequestError(`Brand id not found!`);
        const products = (
            await db.Product.findAll({
                where: {
                    brand_id: brand_id
                },
                attributes: { exclude: ['brand_id', 'category_id'] },
                include: [
                    {
                        model: db.ProductDetail,
                        attributes: ['id', 'size', 'color', 'status'],
                        required: true,
                        as: 'ProductDetail',
                    },
                    {
                        model: db.Brand,
                        attributes: ['name'],
                        required: true,
                    },
                    {
                        model: db.Category,
                        attributes: [],
                        required: true,
                    },
                ],
                nest: true,
                required: true,
        }))
        .map(product => product.toJSON());

        return products;
    }

    static get_by_brand_name = async ( brandName ) => {
        const brand_id = await BrandService.get_id_by_name(brandName);
        if(!brand_id) throw new BadRequestError(`Brand name not found!`);
        return await this.get_by_brand_id(brand_id);
    }

    static get_by_category_id = async ( category_id ) => {
        const isCategoryExist = await CategoryService.is_exists(category_id);
        if(!isCategoryExist) throw new BadRequestError(`Category id not found!`);

        const products = ( 
                await db.Product.findAll({
                where: {
                    category_id: category_id
                },
                attributes: { exclude: ['brand_id', 'category_id'] },
                include: [
                    {
                        model: db.ProductDetail,
                        attributes: ['id', 'size', 'color', 'status'],
                        required: true,
                        as: 'ProductDetail',
                    },
                    {
                        model: db.Brand,
                        attributes: ['name'],
                        required: true,
                    },
                    {
                        model: db.Category,
                        attributes: [],
                        required: true,
                    },
                ],
                nest: true,
                required: true,
            }))
            .map(product => product.toJSON());
        return products;
    }

    static get_by_category_name = async ( categoryName ) => {
        const category_id = await CategoryService.get_id_by_name(categoryName);
        if(!category_id) throw new BadRequestError(`Category name not found!`);
        return await this.get_by_category_id(category_id);
    }

    static filter_by_query_options = async ({ filters, sort=[['name', 'ASC']] }) => {
        const new_filters = this.__formatFiltersOptions(filters);
        const products = (
            await db.Product.findAll({
                where: { 
                    ...new_filters,    
                },
                attributes: { exclude: ['brand_id', 'category_id'] },
                include: [
                    {
                        model: db.ProductDetail,
                        attributes: ['id', 'size', 'color', 'status'],
                        required: true,
                        as: 'ProductDetail',
                    },
                    {
                        model: db.Brand,
                        attributes: ['name'],
                        required: true,
                    },
                    {
                        model: db.Category,
                        attributes: [],
                        required: true,
                    },
                ],
                order: sort,
                nest: true,
                required: true
            }))
            .map(product => product.toJSON());
        return products;
    }

    static __formatFiltersOptions = (filters) => {
        const fomart_filters = formatKeys(
            getInfoData(['brand', 'category', 'size', 'color', 'rating'], filters)
        );
        return removeNull(
            {
                ...fomart_filters,
                "current_unit_price": filters.price? { [Op.between]: filters.price} : null
            }
        );
    } 
}

module.exports = ProductService;