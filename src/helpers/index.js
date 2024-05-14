const { v4: uuidv4 } = require('uuid');
const slug = require('slug');
const {
    config: { SIZE, COLOR },
  } = require("../constants/index");

const generateUUID = () => uuidv4();

const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

const generateSlug = (str) => slug(str);

const generateSKUno = ({ brand_code, catalogue_code, product_id, sku_color, sku_size }) => {
    const color_code =  Object.keys(COLOR).find(key => COLOR[key].includes(sku_color));

    if (!color_code) throw new Error('Invalid color or size');
    const product_code = product_id.slice(0, 7);
    return `${brand_code}-${catalogue_code}-${product_code}-${color_code}-${sku_size}`;
}   

module.exports = {
    generateUUID,
    asyncHandler,
    generateSlug,
    generateSKUno
};