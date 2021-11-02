var express = require('express');
var router = express.Router();

const controller = require('../controller/user_controller')

router.get('/signup', controller.isNotAuth, controller.createUser);
router.post('/signup', controller.postUserValidate, controller.postUser, controller.postAuthSignUp);

router.get('/signin', controller.isNotAuth, controller.getUserLogin);
router.post('/signin', controller.postUserValidateLogin, controller.postAuthLogin, controller.loginAuth);

router.get('/profile', controller.isAuth, controller.getProfileUser)

router.get('/logout', controller.isAuth, controller.getLogout)



module.exports = router;