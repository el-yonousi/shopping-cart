const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../model/user')

passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
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
            return done(null, false, req.flash('signinError', 'email not found, please sign up'))
        }

        /* password invalide */
        if (!user.comparePassword(password)) {
            return done(null, false, req.flash('signinError', 'wrong password'))
        }

        /* when everything was success */
        return done(null, user)
    })
}))


/* we noticed you, that we call this file in app.js */