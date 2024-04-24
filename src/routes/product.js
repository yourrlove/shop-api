const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller')

router.post('/', productController.create_product);
router.get('/', productController.get_list_products);
router.put('/:id', productController.update_product);
router.delete('/:id', productController.delete_product);
router.post('/:id/productdetail', productController.create_product_detail);
router.get('/:id/productdetail', productController.get_all_product_details);
router.delete('/productdetail/:id', productController.delete_product_detail);
router.put('/productdetail/:id', productController.update_product_detail);

module.exports = router;