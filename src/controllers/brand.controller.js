const BrandService = require('../services/brand.service');
const { OK, CREATED, NO_CONTENT } = require('../core/success.response');
class BrandController {
    createBrand = async (req, res, next) => {
        new CREATED({
            message: 'Brand created successfully!',
            metadata: await BrandService.create(req.body)
        }).send(res);
    }

    getAllBrands = async (req, res, next) => {
        new OK({
            message: 'List of brands',
            metadata: await BrandService.get_all()
        }).send(res);
    }

    deleteBrand = async (req, res, next) => {
        new OK({
            message: 'Brand deleted successfully!',
            metadata: await BrandService.delete(req.params.id)
        }).send(res);
    }

    updateBrand = async (req, res, next) => {
        new OK({
            message: 'Brand updated successfully!',
            metadata: await BrandService.update(req.params.id, req.body)
        }).send(res);
    }
}

module.exports = new BrandController();