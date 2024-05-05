'use strict';
const { CREATED, OK } = require('../core/success.response');
const { BadRequestError } = require('../core/error.response');
const ProductDetailService = require('../services/product_detail.service');
const ProductService = require('../services/product.service');

class UploadController {
    upload_product_thumbnail = async (req, res, next) => {
        const { file } = req;
        if (!file) {
            throw new BadRequestError('File missing!');  
        }
        new OK({
            message: 'Product thumbnail uploaded successfully!',
            metadata: await ProductService.update_thumbnail(file, req.params.id)
        }).send(res);
    }

    upload_product_detail_images = async (req, res, next) => {
        const { files } = req;
        if (!files) {
            throw new BadRequestError('File missing!');  
        }
        new OK({
            message: 'Product detail images uploaded successfully!',
            metadata: await ProductDetailService.update_image(files, req.params.id)
        }).send(res);
    }
}


module.exports = new UploadController();