"use strict";
const db = require("../models/index");
const { generateUUID } = require("../helpers/index");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const BrandService = require("./brand.service");
const CatalogueService = require("./catalogue.service");
const TagService = require("./tag.service");
const {
  formatKeys,
  getInfoData,
  removeNull,
  formatDataReturn,
} = require("../utils/index");
const { Op } = require("sequelize");
const { includes } = require("lodash");
const { QueryTypes } = require("sequelize");

class ProductService {
  static create = async ({
    name,
    description,
    quantity,
    status,
    current_unit_price,
    thumbnail,
    brand_id,
    catalogue_id,
    tag_id,
  }) => {
    const isBrandIdExist = BrandService.is_exists(brand_id);
    if (!isBrandIdExist) throw new BadRequestError(`Brand id not found!`);
    const id = generateUUID();
    const product = await db.Product.create({
      id,
      name,
      description,
      quantity,
      status,
      current_unit_price,
      thumbnail,
      brand_id,
      catalogue_id,
      tag_id,
    });
    return product;
  };

  static get_all = async () => {
    const products = (
        await db.Product.findAll ({
            attributes: { exclude: ['brand_id', 'catalogue_id', 'tag_id'] },
            include: [
                {
                    model: db.Brand,
                    attributes: ['name'],
                    required: true,
                },
                {
                    model: db.Catalogue,
                    attributes: ['name'],
                    required: true,
                },
                {
                    model: db.Tag,
                    attributes: ['name'],
                    required: true,
                },
                {
                    model: db.ProductDetail,
                    attributes: ["color"],
                    as: "ProductDetail",
                    include: [
                        {
                            model: db.Size,
                            attributes: ["type"],
                            as: 'size'
                        },
                    ]
                },
            ],
            nest: true,
        })).map(record => formatDataReturn(record.toJSON()))

    return products;
  };

  static update = async (id, body) => {
    const product = await db.Product.update(
      {
        ...body,
      },
      {
        where: { id: id },
      }
    );
    if (!product[0]) throw new NotFoundError(`Product not found`);
    return product;
  };

  static delete = async (id) => {
    const product = await db.Product.destroy({ where: { id: id } });
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
            attributes: ["id", "color", "status"],
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
    ).map((product) => formatDataReturn(product.toJSON()));

    return products;
  };

  static get_by_brand_name = async (brandName) => {
    const brand_id = await BrandService.get_id_by_name(brandName);
    if (!brand_id) throw new BadRequestError(`Brand name not found!`);
    return await this.get_by_brand_id(brand_id);
  };

  static get_by_catalogue_id = async (catalogue_id) => {
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
            attributes: ["color"],
            as: "ProductDetail",
            include: [
                {
                    model: db.Size,
                    attributes: ["type"],
                    as: 'size'
                },
            ]
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
    ).map((product) => formatDataReturn(product.toJSON()));
    return products;
  };

  static get_by_catalogue_name = async (catalogueName) => {
    const catalogue_id = await CatalogueService.get_id_by_name(catalogueName);
    if (!catalogue_id) throw new BadRequestError(`Catalogue name not found!`);
    return await this.get_by_catalogue_id(catalogue_id);
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
            attributes: ["color"],
            as: "ProductDetail",
            include: [
                {
                    model: db.Size,
                    attributes: ["type"],
                    as: 'size'
                },
            ]
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

  static get_by_tag_id = async (tag_id) => {
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
            attributes: ["color"],
            as: "ProductDetail",
            include: [
                {
                    model: db.Size,
                    attributes: ["type"],
                    as: 'size'
                },
            ]
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
    ).map((product) => formatDataReturn(product.toJSON()));
    return products;
  };

  static get_by_tag_name = async (tagName) => {
    const tag_id = await TagService.get_id_by_name(tagName);
    if (!tag_id) throw new BadRequestError(`Tag name not found!`);
    return await this.get_by_tag_id(tag_id);
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
}

module.exports = ProductService;
