'use strict';

const _ = require('lodash');
const { Op } = require('sequelize');

const productOptions = ["size", "color"];

const getInfoData = ( fields = [], object = {} ) => {
    return _.pick( object, fields );
}

const formatKeys = (object) => {
    return _.mapKeys(object, __options);
}

const removeNull = (object) => {
    return _.omitBy(object, _.isNil);
}

const __options = (value, key) => {
    if(key === "brand") return "$Brand.name$";
    if(key === "catalogue") return "$Catalogue.name$";
    if(key === "tag") return "$Tag.name$";
    if(productOptions.includes(key))  return `$ProductDetail.${key}$`;
    return key;
}

module.exports = {
    getInfoData,
    formatKeys,                                                                                                                                    
    removeNull,
}