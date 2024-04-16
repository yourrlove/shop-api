'use strict';
const db = require('../models/index');
const { generateUUID } = require('../helpers/index');


class ProductDetailService {
    static create = async ( product_id, { quantity, color, size, status } ) => {
        const id = generateUUID();
        const productDetail = await db.ProductDetail.create({ 
            id,
            quantity,
            status,
            size,
            color,
            product_id
        });
        return productDetail;
    }

    static get_all = async ( id ) => {
        const productDetails = await db.ProductDetail.findAll({ 
            where: { product_id: id },
            raw: true
        });
        return productDetails;
    }

    static delete = async ( id ) => {
        await db.ProductDetail.destroy({ 
            where: { id: id },
            force: false 
        });
        return "success to delete productDetail";
    }

    static update = async ( id, body ) => {
        const productDetail = await db.ProductDetail.update({ 
            ...body
        }, {
            where: { id: id }
        });
        return productDetail;
    }
}

module.exports = ProductDetailService;