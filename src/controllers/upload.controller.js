'use strict';
const { CREATED, OK } = require('../core/success.response');
const { BadRequestError } = require('../core/error.response');
const ProductDetailService = require('../services/product_detail.service');
const ProductService = require('../services/product.service');

class UploadController {
    upload_product_thumbnail = async (req, res, next) => {
        new OK({
            message: 'Product thumbnail uploaded successfully!',
            metadata: await ProductService.update_thumbnail(req.params.productId, req.params.productdetailId, req.body.orders)
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