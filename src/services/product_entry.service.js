const db = require("../models/index");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { checkRequestParams } = require("../utils/index");
const ProductEntryDetailService = require("./product_entry_detail.service");
const { generateUUID } = require("../helpers/index");

class ProductEntryService {
  static create = async (user_id, productEntryBody) => {
    const user = await db.User.findOne({ user_id: user_id });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const productEntry = await db.ProductEntry.create({
      product_entry_id: generateUUID(),
      title: productEntryBody.title,
      user_id: user_id,
    });
    checkRequestParams(productEntryBody);
    if (productEntryBody.list_products) {
      const result = await ProductEntryDetailService.create(
        productEntry.product_entry_id,
        productEntryBody.list_products
      );
    }
    return productEntry;
  };

  static getAll = async (user_id, limit = 40, offset = 0) => {
    const user = await db.User.findOne({ user_id: user_id });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const productEntries = await db.ProductEntry.findAll({
      limit: limit,
      offset: limit * offset,
      raw: true
    });
    return productEntries;
  };
}

module.exports = ProductEntryService;