"use strict";
const db = require("../models/index");
const { generateUUID, generateSlug } = require("../helpers/index");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const BrandService = require("./brand.service");
const CatalogueService = require("./catalogue.service");
const TagService = require("./tag.service");
const ProductDetailService = require("./product_detail.service");
const {
  formatKeys,
  getInfoData,
  removeNull,
  formatDataReturn,
  getValues,
} = require("../utils/index");
const { Op } = require("sequelize");
const {
  config: { CLOUD_IMAGE_FOLDER },
} = require("../constants/index");
const { includes } = require("lodash");
const { uploadMultipleImages } = require("../services/upload.service");

class ProductService {
  static create = async ({
    product_name,
    product_desc,
    product_price,
    brand_id,
    catalogue_id,
    tag_id,
    items,
  }) => {
    const [brand, catalogue] = await Promise.all([
      BrandService.is_exists(brand_id),
      CatalogueService.is_exists(catalogue_id),
      TagService.is_exists(tag_id),
    ]);

    if (!brand) throw new NotFoundError(`Brand id not found!`);
    if (!catalogue) throw new NotFoundError(`Catalogue id not found!`);

    const product_id = generateUUID();
    const product_slug = generateSlug(
      `${brand.name} ${catalogue.name} ${product_name}`
    );
    const product = await db.Product.create({
      product_id,
      product_name,
      product_desc,
      product_price,
      product_slug,
      brand_id,
      catalogue_id,
      tag_id,
    });

    items = await Promise.all(
      items.map(async (item) => {
        return await ProductDetailService.create(product.product_id, item);
      })
    )

    return product;
  };

  static get_all = async () => {
    const products = (
      await db.Product.findAll({
        attributes: [
          "id",
          "product_name",
          "product_desc",
          "product_price",
          "product_rating",
          "product_slug",
        ],
        include: [
          {
            model: db.Brand,
            attributes: ["name"],
            required: true,
          },
          {
            model: db.Tag,
            attributes: ["name", "label"],
            required: true,
          },
          {
            model: db.ProductDetail,
            attributes: {
              exclude: [
                "product_id",
                "status",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "sku_price",
                "sku_status",
              ],
            },
            as: "ProductDetail",
          },
        ],
        order: [
          [
            { model: db.ProductDetail, as: "ProductDetail" },
            "sku_color",
            "ASC",
          ],
        ],
        nest: true,
      })
    ).map((record) => formatDataReturn(record.toJSON()));

    return products;
  };

  static update = async (id, body) => {
    // remove parameters null, undefined
    const product = await db.Product.update(
      {
        ...body,
      },
      {
        where: { product_id: id },
      }
    );
    if (!product[0]) throw new NotFoundError(`Product not found`);
    return product;
  };

  static delete = async (id) => {
    const product = await db.Product.destroy({ where: { product_id: id } });
    if (!product) throw new NotFoundError(`Product not found`);
    return product;
  };

  static get_by_brand_id = async (brand_id) => {
    const isBrandIdExist = BrandService.is_exists(brand_id);
    if (!isBrandIdExist) throw new BadRequestError(`Brand id not found!`);
    const products = (
      await db.Product.findAll({
        where: {
          brand_id: brand_id,
        },
        attributes: { exclude: ["brand_id", "catalogue_id", "tag_id"] },
        include: [
          {
            model: db.ProductDetail,
            attributes: {
              exclude: [
                "product_id",
                "status",
                "createdAt",
                "updatedAt",
                "deletedAt",
              ],
            },
            required: true,
            as: "ProductDetail",
          },
          {
            model: db.Brand,
            attributes: ["name"],
            required: true,
          },
          {
            model: db.Catalogue,
            attributes: [],
            required: true,
          },
          {
            model: db.Tag,
            attributes: ["name"],
            required: true,
          },
        ],
        nest: true,
        required: true,
      })
    )
    //.map((product) => formatDataReturn(product.toJSON()));

    return products;
  };

  static get_by_brand_name = async (brandName, limit, offset) => {
    const brand_id = await BrandService.get_id_by_name(brandName);
    if (!brand_id) throw new BadRequestError(`Brand name not found!`);
    return await this.get_by_brand_id(brand_id, limit, offset);
  };

  static get_by_catalogue_id = async (catalogue_id, limit, offset) => {
    const isCatalogueExist = await CatalogueService.is_exists(catalogue_id);
    if (!isCatalogueExist) throw new BadRequestError(`Catalogue id not found!`);

    const products = (
      await db.Product.findAll({
        where: {
          catalogue_id: catalogue_id,
        },
        attributes: { exclude: ["brand_id", "catalogue_id", "tag_id"] },
        include: [
          {
            model: db.ProductDetail,
            attributes: {
              exclude: [
                "product_id",
                "status",
                "createdAt",
                "updatedAt",
                "deletedAt",
              ],
            },
            as: "ProductDetail",
            include: [
              {
                model: db.Size,
                attributes: ["type"],
                as: "size",
              },
            ],
          },
          {
            model: db.Brand,
            attributes: ["name"],
            required: true,
          },
          {
            model: db.Catalogue,
            attributes: [],
            required: true,
          },
          {
            model: db.Tag,
            attributes: ["name"],
            required: true,
          },
        ],
        limit: limit, 
        offset: offset * limit,
        nest: true,
        required: true,
      })
    )
    //.map((product) => formatDataReturn(product.toJSON()));
    return products;
  };

  static get_by_catalogue_name = async (catalogueName, limit, offset) => {
    const catalogue_id = await CatalogueService.get_id_by_name(catalogueName);
    if (!catalogue_id) throw new BadRequestError(`Catalogue name not found!`);
    return await this.get_by_catalogue_id(catalogue_id, limit, offset);
  };

  static filter_by_query_options = async ({
    filters,
    sort = [["name", "ASC"]],
  }) => {
    const new_filters = this.__formatFiltersOptions(filters);
    const products = (
      await db.Product.findAll({
        where: {
          ...new_filters,
        },
        attributes: { exclude: ["brand_id", "catalogue_id", "tag_id"] },
        include: [
          {
            model: db.ProductDetail,
            attributes: {
              exclude: [
                "product_id",
                "status",
                "createdAt",
                "updatedAt",
                "deletedAt",
              ],
            },
            as: "ProductDetail",
            include: [
              {
                model: db.Size,
                attributes: ["type"],
                as: "size",
              },
            ],
          },
          {
            model: db.Brand,
            attributes: ["name"],
            required: true,
          },
          {
            model: db.Catalogue,
            attributes: [],
            required: true,
          },
          {
            model: db.Tag,
            attributes: ["name"],
            required: true,
          },
        ],
        order: sort,
        nest: true,
        required: true,
      })
    ).map((product) => formatDataReturn(product.toJSON()));
    return products;
  };

  static get_by_tag_id = async (tag_id, limit, offset) => {
    const isTagExist = await TagService.is_exists(tag_id);
    if (!isTagExist) throw new BadRequestError(`Tag id not found!`);

    const products = (
      await db.Product.findAll({
        where: {
          tag_id: tag_id,
        },
        attributes: { exclude: ["brand_id", "catalogue_id", "tag_id"] },
        include: [
          {
            model: db.ProductDetail,
            attributes: {
              exclude: [
                "product_id",
                "status",
                "createdAt",
                "updatedAt",
                "deletedAt",
              ],
            },
            as: "ProductDetail",
            include: [
              {
                model: db.Size,
                attributes: ["type"],
                as: "size",
              },
            ],
          },
          {
            model: db.Brand,
            attributes: ["name"],
            required: true,
          },
          {
            model: db.Catalogue,
            attributes: [],
            required: true,
          },
          {
            model: db.Tag,
            attributes: ["name"],
            required: true,
          },
        ],
        limit: limit, 
        offset: offset * limit,
        nest: true,
        required: true,
      })
    )
    //.map((product) => formatDataReturn(product.toJSON()));
    return products;
  };

  static get_by_tag_name = async (tagName, limit, offset) => {
    const tag_id = await TagService.get_id_by_name(tagName);
    if (!tag_id) throw new BadRequestError(`Tag name not found!`);
    return await this.get_by_tag_id(tag_id, limit, offset);
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
      current_unit_price: filters.price
        ? { [Op.between]: filters.price }
        : null,
    });
  };

  static update_thumbnail = async (product_id, files) => {
    const product = await db.Product.findOne({
      where: { product_id: product_id },
      include: {
        model: db.Brand,
        attributes: ["name"],
      },
    });
    if (!product) throw new NotFoundError(`Product not found!`);

    if (!files) throw new NotFoundError(`Files are missing!`);

    const urls = await uploadMultipleImages({
      files: files,
      name: `${product.product_slug}-thumb`,
      folderName: `${CLOUD_IMAGE_FOLDER}${product.Brand.name}`,
    });

    product.product_thumb = getValues(urls, "image_url");

    return await product.save();
  };

  static isProductExist = async (product_id) => {
    return await db.Product.findOne({
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
  };

  static createProductslug = async () => {
    const products = await db.Product.findAll({
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
    });
    
    await Promise.all(
      products.map(async (product) => {
        const product_slug = generateSlug(
          `${product.Brand.name} ${product.Catalogue.name} ${product.product_name}`
        );
        product.product_slug = product_slug;
        await product.save();
      })
    );

    return products;
  };
}

module.exports = ProductService;
