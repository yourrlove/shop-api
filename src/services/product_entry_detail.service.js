const db = require("../models/index");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { checkRequestParams } = require("../utils/index");
const ProductDetailService = require("./product_detail.service");
const { includes } = require("lodash");

class ProductEntryDetailService {
  static create = async (product_entry_id, list_products) => {
    checkRequestParams(list_products);
    list_products = await Promise.all(
      list_products.map(async (item) => {
        const entry_product = await db.ProductEntryDetailService.create({
          product_entry_id: product_entry_id,
          sku_id: item.sku_id,
          entry_quantity: item.quantity,
          entry_price: item.price,
        });
        if (!entry_product) {
          throw new BadRequestError("Create product entry failed");
        }
        return entry_product;
      })
    );
    return list_products;
  };

  static getDetail = async (user_id, product_entry_id) => {
    const user = await db.User.findOne({ user_id: user_id });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const product_entry = await db.ProductEntry.findOne({
      where: {
        product_entry_id: product_entry_id,
      },
      include: {
        model: db.ProductEntryDetail,
        include: {
          model: db.ProductDetail,
          attributes: ["sku_size", "sku_color", "sku_image"],
          include: {
            model: db.Product,
            attributes: ["product_name"],
            include: {
              model: db.Brand,
              attributes: ["name"],
            },
          },
        },
      },
    });
    if (!product_entry) {
      throw new NotFoundError("Product entry not found");
    }
    return product_entry;
  };
}

module.exports = ProductEntryDetailService;
