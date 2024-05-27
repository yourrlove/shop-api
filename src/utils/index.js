"use strict";

const _ = require("lodash");
const { BadRequestError } = require("../core/error.response");

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

const checkRequestParams = (parameters = {}) => {
  for (const [key, value] of Object.entries(parameters)) {
    if(value === undefined || value === "") {
      throw new BadRequestError(`${key} is not allowed empty or undefined1`);
    }
  }
};

const flattenNestedObject = (object = {}, field) => {
  return _.merge(_.get(object, field), _.omit(object, field));
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

const extractFields = (array, fieldPath) => {
  return _.map(array, item => _.get(item, fieldPath));
}

module.exports = {
  getInfoData,
  formatKeys,
  removeNull,
  formatDataReturn,
  getValues,
  checkRequestParams,
  flattenNestedObject,
  extractFields
};
