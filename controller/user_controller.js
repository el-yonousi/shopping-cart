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
    const messagesError = req.flash('signupError')
    res.render('user/signup', { title: 'Register', messages: messagesError })
}

const postUserValidate = [
    check('email').not().isEmpty().withMessage('must not empty'),
    check('email').isEmail().withMessage('not valide'),
    check('password').not().isEmpty().withMessage('must not empty'),
    check('password').isLength({ min: 8 }).withMessage('min length 8 characters'),
    check('c_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('and password not matched')
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
            v_mssg.push({ key: errors.errors[i].param, mssg: errors.errors[i].msg })
        }
        req.flash('signupError', v_mssg)
        res.redirect('signup')
        return
    }

    next()

    // const user = new User({
    //     email: req.body.email,
    //     password: new User().hashPassword(req.body.password)
    // })

    // // check email unique
    // User.findOne({ email: req.body.email }, (error, result) => {
    //     if (error) {
    //         console.log(error);
    //         return
    //     }
    //     if (result) {
    //         req.flash('signupError', 'email has already been taken')
    //         res.redirect('signup')
    //         return
    //     }
    //     user.save((error, result) => {
    //         if (error) {
    //             console.log(error);
    //             return
    //         }
    //         res.redirect('signin')
    //     })
    // })
}

const postAuthSignUp = passport.authenticate('local-signup', {
    session: false,
    successRedirect: 'signin',
    failureRedirect: 'signup',
    failureFlash: true
})

/**
 * user login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const postUserValidateLogin = [
    check('email').not().isEmpty().withMessage('must not empty'),
    check('email').isEmail().withMessage('not valide'),
    check('password').not().isEmpty().withMessage('must not empty'),
    check('password').isLength({ min: 8 }).withMessage('min length 8 characters'),
]

const getUserLogin = (req, res, next) => {
    const messagesError = req.flash('signinError')
    res.render('user/signin', { title: 'Login', messages: messagesError })
}
const postAuthLogin = (req, res, next) => {
    const errors = validationResult(req)
    const v_mssg = []

    if (!errors.isEmpty()) {
        for (let i = 0; i < errors.errors.length; i++) {
            v_mssg.push({ key: errors.errors[i].param, mssg: errors.errors[i].msg })
        }
        req.flash('signinError', v_mssg)
        res.redirect('signin')
        return
    }

    /* go to next step in this callback function second */
    next(0)
}
const loginAuth = passport.authenticate('local-signin', {
    successRedirect: 'profile',
    failureRedirect: 'signin',
    failureFlash: true,
})

const getProfileUser = (req, res, next) => {
    let email = ''
    if (req.isAuthenticated()) {
        email = req.user.email
    }
    res.render('user/profile', {
        title: 'Profile',
        checkAuthUser: true,
        user: {
            email: email
        },
        checkProfile: true
    })
}

const getLogout = (req, res, next) => {
    req.logOut()
    res.redirect('/')
}

const isAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('signin')
    }
    next()
}

const isNotAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
        return
    }
    next()
}

module.exports = {
    createUser: createUser,
    postUser: postUser,
    postUserValidate: postUserValidate,
    postUserValidateLogin: postUserValidateLogin,
    postAuthSignUp: postAuthSignUp,
    getUserLogin: getUserLogin,
    postAuthLogin: postAuthLogin,
    loginAuth: loginAuth,
    getProfileUser: getProfileUser,
    getLogout: getLogout,
    isAuth: isAuth,
    isNotAuth: isNotAuth
}