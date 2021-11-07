var express = require('express');
var router = express.Router();

const controleIndex = require('../controller/index_controller')

/* GET home page. */
router.get('/', controleIndex.getIndex);

module.exports = router;