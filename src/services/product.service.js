'use strict';
const db = require('../models/index');
const { generateUUID } = require('../helpers/index');
const { BadRequestError, NotFoundError } = require('../core/error.response');

class ProductService {
    static create = async ({ name, description, quantity, status, current_unit_price, thumbnail }) => {
        const id = generateUUID();
        const product = await db.Product.create({ 
            id,
            name,
            description,
            quantity,
            status,
            current_unit_price,
            thumbnail
        });
        return product;
    }

    static get_all = async ( ) => {
        return await db.Product.findAll({ raw: true });
    }

    static update = async ( id, body) => {
        const product = await db.Product.update({
            ...body
        }, {
            where: {id : id}
        });
        if(!product) throw new NotFoundError(`Product not found`);
        return product;
    }
    
    static delete = async ( id ) => {
        const product = await db.Product.destroy({ where: { id: id } });
        if(!product) throw new NotFoundError(`Product not found`);
        return product;
    }
}

module.exports = ProductService;