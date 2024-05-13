"use strict";
const db = require("../models/index");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { generateUUID } = require("../helpers/index");

class OrderService {
    static create = async(user_id) => {
        if (!user_id) {
            throw new Error("Invalid user ID"); // Kiểm tra user_id hợp lệ
        }
        const id = generateUUID();
        const order = await db.Orders.create({
            id: id,
            user_id: user_id
        })
        return order
    }

    static delete = async (order_id) => {
        const order = await db.Orders.findByPk(order_id);
        if (!order) {
            throw new NotFoundError("Order not found");
        }
        // Xóa order
        await db.Orders.destroy({
            where: {
                id: order_id
            }
        });
    }
    // Get all orders of customer 
    
    static getOrders = async(user_id) => {
        debugger
        const orders = await db.Orders.findAll({
            where: {
                user_id: user_id
            },
            attributes: ['id', 'total_price', 'user_id'] 
        });
        debugger
    
        const getOrderDetailPromises = orders.map(async (order) => {
            const orderDetails = await db.Orders.findAll({
                attributes: [],
                where: { id: order.id }, // Use order.id instead of undefined order_id
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
        });
    
        const orderDetails = await Promise.all(getOrderDetailPromises);
    
        const ordersWithDetails = orders.map((order, index) => ({
            order: order,
            Order_details: orderDetails[index]
        }));
    
        debugger
        return ordersWithDetails;
    }

    static testservice = async() => {
        return "hello"
    }
}

module.exports = OrderService