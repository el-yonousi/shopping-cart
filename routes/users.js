var express = require('express');
var router = express.Router();

const controller = require('../controller/user_controller')

router.get('/signup', controller.createUser);
router.post('/signup', controller.postUserValidate, controller.postUser);
router.get('/signin', controller.getUserLogin);
router.post('/signin', controller.loginAuth);
router.get('/profile', controller.getProfileUser)



module.exports = router;