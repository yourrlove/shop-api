"use strict";

const _ = require("lodash");
const { Op } = require("sequelize");

const productOptions = ["size", "color"];

const getInfoData = (fields = [], object = {}) => {
  return _.pick(object, fields);
};

const formatKeys = (object) => {
  return _.mapKeys(object, __options);
};

const removeNull = (object) => {
  return _.omitBy(object, _.isNil);
};

const formatDataReturn = (object) => {
  return _.mapValues(object, __returnOptions);
};

const __options = (value, key) => {
  if (key === "brand") return "$Product.Brand.name$";
  if (key === "catalogue") return "$Product.Catalogue.name$";
  if (key === "tag") return "$Product.Tag.name$";
  if (key === "rating") return `$Product.product_rating$`;
  if (key === "color") return `sku_color`;
  if (key === "size") return `sku_size`;
  return key;
};

const __returnOptions = (value, key) => {
  if (key === "Brand") return value.name;
  if (key === "Catalogue") return value.name;
  if (key === "Tag") return value.label;
  return value;
};

const getValues = (object, key) => _.map(object, key);


module.exports = {
  getInfoData,
  formatKeys,
  removeNull,
  formatDataReturn,
  getValues,
};
