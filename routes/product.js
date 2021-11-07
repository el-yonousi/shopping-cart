var express = require('express');
var router = express.Router();

const controleProduct = require('../controller/product_controller')
const controleCart = require('../controller/cart_controller')

/** products */
router.get('/', controleProduct.isAuth, controleProduct.getAllProduct)
router.get('/delete', controleProduct.isAuth, controleProduct.deleteProducts)
router.get('/:product', controleProduct.isAuth, controleProduct.showProduct)
router.get('/:product/delete', controleProduct.isAuth, controleProduct.deleteProduct)

/** carts */
router.get('/shop/carts', controleCart.isAuth, controleCart.showCart)
router.get('/:_idProduct/cart_store', controleCart.isAuth, controleCart.showIdProduct)
router.post('/:_idProduct/cart_store', controleCart.isAuth, controleCart.postProduct)

module.exports = router;