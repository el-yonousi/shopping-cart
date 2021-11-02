const { check, validationResult } = require('express-validator')
const User = require('../model/user')
const passport = require('passport')

/**
 * user register
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const createUser = (req, res, next) => {
    const messagesError = req.flash('error')
    res.render('user/signup', { title: 'Register', essages: messagesError })
}

const postUserValidate = [
    check('email').not().isEmpty().withMessage('enter your email'),
    check('email').isEmail().withMessage('email not valide'),
    check('password').not().isEmpty().withMessage('enter password'),
    check('password').isLength({ min: 8 }).withMessage('min length 8 characters'),
    check('c-password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('confirm password not matched')
        }
        return true
    }),
]

/* POST */
const postUser = (req, res, next) => {
    const errors = validationResult(req)
    const v_mssg = []

    if (!errors.isEmpty()) {
        for (let i = 0; i < errors.errors.length; i++) {
            v_mssg.push(errors.errors[i].msg)
        }
        req.flash('error', v_mssg)
        res.redirect('signup')
        return
    }
    const user = new User({
        email: req.body.email,
        password: new User().hashPassword(req.body.password)
    })

    // check email unique
    User.findOne({ email: req.body.email }, (error, result) => {
        if (error) {
            console.log(error);
            return
        }
        if (result) {
            req.flash('error', 'email has already been taken')
            res.redirect('signup')
            return
        }
        user.save((error, result) => {
            if (error) {
                console.log(error);
                return
            }
            res.redirect('signin')
        })
    })
}

/**
 * user login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getUserLogin = (req, res, next) => {
    const messagesError = req.flash('error')
    res.render('user/signin', { title: 'Login', messages: messagesError })
}

const loginAuth = passport.authenticate('local-signin', {
    successRedirect: 'profile',
    failureRedirect: 'signin',
    failureFlash: true,
})

const getProfileUser = (req, res, next) => {
    console.log({
        session: req.session,
        user: req.user
    })
    res.render('user/profile', { title: 'Profile' })
}
module.exports = {
    createUser: createUser,
    postUser: postUser,
    postUserValidate: postUserValidate,
    getUserLogin: getUserLogin,
    loginAuth: loginAuth,
    getProfileUser: getProfileUser
}