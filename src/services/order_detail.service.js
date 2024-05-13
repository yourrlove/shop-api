"use strict";
const db = require("../models/index");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { generateUUID } = require("../helpers/index");
const OrderService = require('../services/order.service')

class OrderDetailService {
    static createdetail = async (user_id, productList) => {
        console.log(user_id)
        const order = await OrderService.create(user_id);
        console.log(order)
        const order_id = order.id;
        console.log(order_id)
        const createdOrderDetails = [];
        debugger
        try {
            for (const orderDetail of productList) {
                const product_detail_id = orderDetail.product_detail_id;
                const quantity = orderDetail.quantity;
                debugger
                const productDetail = await db.ProductDetail.findByPk(product_detail_id);
    
                if (!productDetail) {
                    throw new NotFoundError(`Product detail with ID ${product_detail_id} not found`);
                }
                // check quantity
                if (productDetail.quantity < quantity) {
                    throw new BadRequestError(`Requested quantity for product ${product_detail_id} exceeds available inventory`);
                }
    
                const createdDetail = await db.OrderDetail.create({
                    order_id: order_id,
                    product_detail_id: orderDetail.product_detail_id,
                    quantity: orderDetail.quantity
                });
                
                createdOrderDetails.push(createdDetail);
            }
            
            return createdOrderDetails;
        } catch (error) {
            for (const detail of createdOrderDetails) {
                debugger
                // Undo in product detail -- available trigger to update in Product table
                const productDetail = await db.ProductDetail.findByPk(detail.product_detail_id);
                productDetail.quantity = productDetail.quantity + detail.quantity;
                await productDetail.save();

                // debugger
                // // delete order detail
                await db.OrderDetail.destroy({
                    where: {
                        order_id: detail.order_id,
                        product_detail_id: detail.product_detail_id
                    }
                });
            }
    
            await db.Orders.destroy({
                where: {
                    id: order_id
                }
            });
            return error

        }
    }
    
    static async getOrderDetails(orderId) {
        const orderDetails = await db.Orders.findAll({
            attributes: [],
            where: { id: orderId },
            include: [{
                model: db.OrderDetail,
                attributes: ['order_id', 'product_detail_id', 'quantity'],
                include: [{
                    model: db.ProductDetail,
                    attributes: ['color', 'product_id'],
                    include: [{
                        model: db.Product,
                        attributes: ['name', 'description', 'current_unit_price', 'rating', 'thumbnail'],
                    }]
                }]
            }],
        });

        return orderDetails;
    }

    static testservicedetail = async() => {
        return await OrderService.testservice()
    }
}

module.exports = OrderDetailService;