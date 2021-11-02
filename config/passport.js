const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../model/user')

passport.serializeUser((user, done) => {
    return done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, ('email'), (error, user) => {
        /* invalide email */
        if (error) {
            return done(error, false)
        }

        /* when everything was success */
        return done(error, user)
    })
})

passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    /* done(error, user, message) done is a mthods take 3 parametre*/
    User.findOne({ email: email }, (error, user) => {
        /* invalide email */
        if (error) {
            return done(error, false)
        }

        /* user not register */
        if (!user) {
            return done(null, false, req.flash('signinError', { key: 'email', mssg: 'not found, please sign up' }))
        }

        /* password invalide */
        if (!user.comparePassword(password)) {
            return done(null, false, req.flash('signinError', 'wrong password'))
        }

        /* when everything was success */
        return done(null, user)
    })
}))

/**
 * sign up
 */
passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return done(err)
        }

        /* if user found check by email */
        if (user) {
            return done(null, false, req.flash('signupError', { key: 'email', mssg: 'has already been taken' }))
        }

        const newUser = new User({
            email: email,
            password: new User().hashPassword(password)
        })

        newUser.save((err, user) => {
            if (err) {
                return done(err)
            }

            return done(null, user)
        })
    })
}))


/* we noticed you, that we call this file in app.js */