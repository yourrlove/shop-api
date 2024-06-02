"use strict";
const axios = require('axios');
const db = require("../models/index");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const {
  generateUUID,
  generateSlug,
  generateSKUno,
} = require("../helpers/index");
const {
  getValues,
  formatDataReturn,
  formatKeys,
  getInfoData,
  removeNull,
  extractFields
} = require("../utils/index");
const { uploadMultipleImages } = require("../services/upload.service");
const {
  config: { CLOUD_IMAGE_FOLDER },
} = require("../constants/index");
const { Op } = require("sequelize");

class ProductDetailService {
  static create = async (
    product_id,
    { sku_color, sku_size, sku_quantity, files }
  ) => {
    try{

      const product = await db.Product.findOne({
        where: { product_id: product_id },
        include: [
          {
            model: db.Brand,
            attributes: ["name", "code"],
          },
          {
            model: db.Catalogue,
            attributes: ["name", "code"],
          },
        ],
        raw: true,
      });
      if (!product) {
        throw new NotFoundError(`Product not found`);
      }
      const sku_slug = generateSlug(`${product.product_slug} ${sku_color}`);
      const sku_no = generateSKUno({
        brand_code: product["Brand.code"],
        catalogue_code: product["Catalogue.code"],
        product_id,
        sku_color,
        sku_size,
      });
  
      const urls = await uploadMultipleImages({
        files: files,
        name: `${sku_slug}`,
        folderName: `${CLOUD_IMAGE_FOLDER}${product["Brand.name"]}`,
      });
      const productSku = await db.ProductDetail.create({
        sku_id: generateUUID(),
        sku_no,
        sku_color,
        sku_size,
        sku_quantity,
        sku_image: getValues(urls, "image_url"),
        sku_slug,
        product_id,
        
      });
      return productSku;
    } catch (error) {
      throw new BadRequestError(error.errors[0]);
    }
  };

  static isExistSkuNo(sku_no) {
    return db.ProductDetail.findOne({ sku_no: sku_no });
  }

  static get_all = async ({ limit, offset }) => {
    const productDetails = await db.ProductDetail.findAll({
      include: {
        model: db.Product,
        include: [
          {
            model: db.Brand,
            attributes: ["name"],
          },
          {
            model: db.Tag,
            attributes: ["name", "label"],
          },
          {
            model: db.Catalogue,
            attributes: ["name"],
          },
        ],
      },
      limit: limit,
      offset: offset * limit,
    });
    return productDetails;
  };

  static delete = async (id) => {
    const result = await db.ProductDetail.destroy({
      where: { sku_id: id },
      force: false,
    });
    if (!result) throw new NotFoundError(`ProductDetail not found`);
    return result;
  };

  static update = async (sku_id, body) => {
    body = removeNull(body);
    const productDetail = await db.ProductDetail.update(
      {
        ...body,
      },
      {
        where: { sku_id: sku_id },
      }
    );
    if (!productDetail) throw new NotFoundError(`ProductDetail not found`);
    return productDetail;
  };

  static updateStock = async (sku_id, { sku_quantity }) => {
    body = removeNull(body);
    const productDetail = await db.ProductDetail.increment(
      {
        sku_quantity: sku_quantity,
      },
      {
        where: {
          sku_id: sku_id,
          sku_quantity: { [Op.gt]: 0 },
        },
      }
    );
    if (!productDetail) throw new NotFoundError(`ProductDetail not found`);
    return productDetail;
  };

  static update_image = async (files, product_detail_id) => {
    const product = await db.ProductDetail.findOne({
      where: { sku_id: product_detail_id },
      include: {
        model: db.Product,
        attributes: ["product_name", "product_slug"],
        include: {
          model: db.Brand,
          attributes: ["name", "code"],
        },
      },
    });
    const urls = await uploadMultipleImages({
      files: files,
      name: `${product.sku_slug}`,
      folderName: `${CLOUD_IMAGE_FOLDER}${product.Product.Brand.name}`,
    });
    product.sku_image = getValues(urls, "image_url");
    await product.save();
    return product;
  };

  static filter_by_query_options = async ({
    filters,
    sort = ["product_name", "ASC"],
    limit,
    offset,
  }) => {
    const new_filters = this.__formatFiltersOptions(filters);
    const products = await db.ProductDetail.findAll({
      where: {
        ...new_filters,
      },
      include: {
        model: db.Product,
        include: [
          {
            model: db.Brand,
            attributes: ["name"],
          },
          {
            model: db.Catalogue,
            attributes: ["name"],
          },
          {
            model: db.Tag,
            attributes: ["name", "label"],
          },
        ],
      },
      order: [[db.Product, ...sort]],
      limit: limit,
      offset: offset * limit,
      nest: true,
      required: true,
    });
    //.map((product) => formatDataReturn(product.toJSON()));
    return {
      Total: await this.countAll(),
      products
    };
  };

  static __formatFiltersOptions = (filters) => {
    const fomart_filters = formatKeys(
      getInfoData(
        ["brand", "catalogue", "tag", "size", "color", "rating"],
        filters
      )
    );
    return removeNull({
      ...fomart_filters,
      "$Product.product_price$": filters.price
        ? { [Op.between]: filters.price }
        : null,
    });
  };

  static countAll = async () => {
    const count = await db.ProductDetail.count();
    return count;
  }

  static createProductDetailslug = async () => {
    const products = await db.ProductDetail.findAll({
      include: {
        model: db.Product,
        attributes: ["product_name", "product_slug"],
        include: [
          {
            model: db.Brand,
            attributes: ["name", "code"],
          },
          {
            model: db.Catalogue,
            attributes: ["name", "code"],
          },
        ],
      },
    });

    await Promise.all(
      products.map(async (product) => {
        const sku_slug = generateSlug(
          `${product.Product.product_slug} ${product.sku_color}`
        );
        const sku_no = generateSKUno({
          brand_code: product.Product.Brand.code,
          catalogue_code: product.Product.Catalogue.code,
          product_id: product.product_id,
          sku_color: product.sku_color,
          sku_size: product.sku_size,
        });

        product.sku_no = sku_no;
        product.sku_slug = sku_slug;
        await product.save();
      })
    );
    return products;
  };

  static getSkuDetails = async (sku_id) => {
    const product_sku = await db.ProductDetail.findOne({
      where: { sku_id: sku_id },
      attributes: { exclude: ["product_id"] },
      include: {
        model: db.Product,
        attributes: { exclude: ["brand_id", "catalogue_id", "tag_id"] },
        include: [
          {
            model: db.Brand,
            attributes: ["name", "code"],
          },
          {
            model: db.Tag,
            attributes: ["name", "label"],
          },
        ],
      },
    });
    if (!product_sku) {
      throw new NotFoundError(`Product SKU not found`);
    }
    return product_sku;
  };

  static getProductDetailsById = async (query) => {
    if(query === undefined || query === null || query === "") {
      return;
    }
    const list_sku_ids =  await this.fetchData(query);
    const product_skus = await db.ProductDetail.findAll({
      where: { sku_id: { [Op.in]: list_sku_ids } },
      attributes: { exclude: ["product_id"] },
      include: {
        model: db.Product,
        attributes: { exclude: ["brand_id", "catalogue_id", "tag_id"] },
        include: [
          {
            model: db.Brand,
            attributes: ["name", "code"],
          },
          {
            model: db.Tag,
            attributes: ["name", "label"],
          },
        ],
      },
    });
    if (!product_skus) {
      throw new NotFoundError(`Product SKUs not found`);
    }
    return product_skus;
  };

  static fetchData = async (query) => {
    try {

      let data = JSON.stringify({
        "query": query
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://3.27.214.37/api/query',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      const response = await axios.request(config)
      
      return extractFields(response.data, 'metadata.sku_id');
    } catch (error) {
      console.error('Error making API call:', error);
    }
  }
}

module.exports = ProductDetailService;
