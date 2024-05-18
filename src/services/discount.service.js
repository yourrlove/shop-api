"use strict";
const { BadRequestError, NotFoundError } = require("../core/error.response");
const db = require("../models/index");
const { generateUUID } = require("../helpers/index");
const { assignWith } = require("lodash");

class DiscountService {
  static create = async (discountBody) => {
    const {
      discount_name,
      discount_desc,
      discount_code,
      discount_type,
      discount_value,
      discount_max_value,
      discount_start_date,
      discount_end_date,
      discount_min_order_value,
      discount_limit_per_user,
      discount_max_use,
      discount_applies_to,
      discount_sku_ids,
      discount_is_active,
    } = discountBody;

    // check discount date
    if (
      new Date() > new Date(discount_start_date) ||
      new Date() > new Date(discount_end_date)
    ) {
      throw new BadRequestError("Discount code has expired!");
    }

    if (new Date(discount_start_date) >= new Date(discount_end_date)) {
      throw new BadRequestError("Discount start date must be before end date!");
    }
    const isDiscountExist = await db.Discount.findOne({
      where: { discount_code: discount_code },
      raw: true,
    });

    if (isDiscountExist) {
      throw new BadRequestError("Discount code already exist!");
    }

    const newDiscount = await db.Discount.create({
      discount_id: generateUUID(),
      discount_name: discount_name,
      discount_desc: discount_desc,
      discount_code: discount_code,
      discount_type: discount_type,
      discount_value: discount_value,
      discount_max_value: discount_max_value,
      discount_start_date: new Date(discount_start_date),
      discount_end_date: new Date(discount_end_date),
      discount_min_order_value: discount_min_order_value,
      discount_limit_per_user: discount_limit_per_user,
      discount_max_use: discount_max_use,
      discount_applies_to: discount_applies_to,
      discount_sku_ids: discount_sku_ids,
      discount_is_active: discount_is_active,
    });

    return newDiscount;
  };

  static getAllDiscounts = async () => {
    const discounts = await db.Discount.findAll();
    return discounts;
  };

  static getProductSkusByDiscountCode = async ({
    discount_code,
    page,
    limit,
  }) => {
    const discount = await db.Discount.findOne({
      where: {
        discount_code: discount_code,
        discount_is_active: true,
      },
      raw: true
    });
    if (!discount) {
      throw new NotFoundError("Discount code not found!");
    }
    let product_skus = [];
    if (discount.discount_applies_to === "specific") {
      product_skus = await db.ProductDetail.findAll({
        where: {
          sku_id: discount.discount_sku_ids,
        },
      });
    }
    if (discount.discount_applies_to === "all") {
      product_skus = await db.ProductDetail.findAll();
    }
    return product_skus;
  };

  static update = async (discount_id, updateBody={}) => {
    const discount = await db.Discount.findOne({
      where: {
        discount_id: discount_id,
      },
      raw: true,
    });
    if (!discount) {
      throw new NotFoundError("Discount code not found!");
    }
    const updatedDiscount = await db.Discount.update(
        updateBody,
        {
            where: {
                discount_id: discount_id,
            },
            raw: true,
        }
    );
    return updatedDiscount[0];
  }

  static delete = async (discount_id) => {
    const discount = await db.Discount.findOne({
      where: {
        discount_id: discount_id,
      },
      raw: true,
    });
    if (!discount) {
      throw new NotFoundError("Discount code not found!");
    }
    const deletedDiscount = await db.Discount.destroy({
      where: {
        discount_id: discount_id,
      },
      raw: true,
    });
    return deletedDiscount[0];
  }
}

module.exports = DiscountService;
