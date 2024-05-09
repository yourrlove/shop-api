"use strict";
const db = require("../models/index");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { generateUUID } = require("../helpers/index");

class OrderService {
    static create = async({user_id, delivery_id}) => {
        const id = generateUUID();

        const order = await db.Order.create({
            user_id: user_id,
            delivery_id: delivery_id
        })
    }
}

module.exports = OrderService