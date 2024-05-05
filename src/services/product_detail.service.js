"use strict";
const db = require("../models/index");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { generateUUID } = require("../helpers/index");
const {
  uploadImageFromLocal,
  uploadMultipleImages,
} = require("../services/upload.service");
const { config: { CLOUD_IMAGE_FOLDER }} = require('../constants/index'); 


class ProductDetailService {
  static create = async (product_id, { quantity, color, size, image }) => {
    const [productDetail, created] = await db.ProductDetail.findOrCreate({
      where: { product_id: product_id, color: color },
      defaults: {
        id: generateUUID(),
        quantity,
        color,
        product_id,
      },
    });
    const new_size = await db.Size.create({
      id: generateUUID(),
      type: size,
      quantity: quantity,
      product_detail_id: productDetail.id,
    });
    const new_image = await db.Image.create({
      id: generateUUID(),
      url: image,
      product_detail_id: productDetail.id,
    });
    return productDetail;
  };

  static get_all = async (id) => {
    const productDetails = await db.ProductDetail.findAll({
      where: { product_id: id },
      raw: true,
    });
    return productDetails;
  };

  static delete = async (id) => {
    const result = await db.ProductDetail.destroy({
      where: { id: id },
      force: false,
    });
    if (!result) throw new NotFoundError(`ProductDetail not found`);
    return result;
  };

  static update = async (id, body) => {
    const productDetail = await db.ProductDetail.update(
      {
        ...body,
      },
      {
        where: { id: id },
      }
    );
    if (!productDetail) throw new NotFoundError(`ProductDetail not found`);
    return productDetail;
  };

  static update_image = async (files, product_detail_id) => {
    const product = await db.ProductDetail.findOne({
      where: { id: product_detail_id },
      attributes: ["color"],
      include: [
        {
          model: db.Product,
          attributes: ["name"],
          include: [
            {
              model: db.Brand,
              attributes: ["name"],
            },
          ],
        },
      ],
      raw: true,
    });
    const urls = await uploadMultipleImages({
      files: files,
      name: `${product["Product.name"]}-${product.color}`,
      folderName: `${CLOUD_IMAGE_FOLDER}${product["Product.Brand.name"]}`,
    });

    await Promise.all(
      urls.map(async (url) => {
        return await db.Image.create({
          id: generateUUID(),
          url: url.image_url,
          product_detail_id: product_detail_id,
        });
      })
    );
    return urls;
  };
}

module.exports = ProductDetailService;
