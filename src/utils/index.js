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
  if (key === "brand") return "$Brand.name$";
  if (key === "catalogue") return "$Catalogue.name$";
  if (key === "tag") return "$Tag.name$";
  if (key === "color") return `$ProductDetail.${key}$`;
  if (key === "size") return `$ProductDetail.size.type$`;
  return key;
};

const __returnOptions = (value, key) => {
  if (key === "Brand") return value.name;
  if (key === "Catalogue") return value.name;
  if (key === "Tag") return value.name;
  if (key === "ProductDetail") {
    return {
      color: _.map(value, "color"),
      size: _.uniq(_.map(_.flattenDeep(_.map(value, "size")), "type")),
    };
  }
  return value;
};

const getValues = (object, key) => _.map(object, key);

module.exports = {
  getInfoData,
  formatKeys,
  removeNull,
  formatDataReturn,
  getValues
};
