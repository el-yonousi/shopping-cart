var express = require('express');
var router = express.Router();

const controleIndex = require('../controller/index_controller')
const controleProduct = require('../controller/product_controller')

/* GET home page. */
router.get('/', controleIndex.getIndex);

router.get('/products', controleProduct.isAuth, controleProduct.getAllProduct)
router.get('/products/delete', controleProduct.isAuth, controleProduct.deleteProducts)
router.get('/products/:product', controleProduct.isAuth, controleProduct.showProduct)
router.get('/products/:product/delete', controleProduct.isAuth, controleProduct.deleteProduct)

module.exports = router;