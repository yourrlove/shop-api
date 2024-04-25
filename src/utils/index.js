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

const formatDataReturn = (object) => {
    return _.mapValues(object, __returnOptions);
}


const __options = (value, key) => {
    if(key === "brand") return "$Brand.name$";
    if(key === "catalogue") return "$Catalogue.name$";
    if(key === "tag") return "$Tag.name$";
    if(productOptions.includes(key))  return `$ProductDetail.${key}$`;
    return key;
}

const __returnOptions = (value, key) => {
    if(key === "Brand") return value.name;
    if(key === "Catalogue") return value.name;
    if(key === "Tag") return value.name;
    if(key === "ProductDetail") {
        return {
            size: _.uniq(_.map(value, 'size')),
            color: _.uniq(_.map(value, 'color')),
        }
    }
    return value;
}

module.exports = {
    getInfoData,
    formatKeys,                                                                                                                                    
    removeNull,
    formatDataReturn,
}