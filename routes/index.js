var express = require('express');
var router = express.Router();

const controle = require('../controller/product_controller')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Shopping Cart' });
});

router.get('/product', controle.getAllProduct)
router.get('/product/delete', controle.deleteProduct)

module.exports = router;