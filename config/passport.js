const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
    app.use(passport.initialize())
    app.use(passport.session())

    passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
        try {
            const user = await User.findOne({ email })
            if (!user) {
                return done(null, false, req.flash('error_msg', 'Email is not registered！'))
            }
            try {
                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                    return done(null, false, req.flash('error_msg', 'Invalid Email or passoword！'))
                }
                return done(null, user)
            } catch (err) {
                console.log(err)
            }
        } catch (err) {
            console.log(err)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id)
                .lean()
            done(null, user)
        } catch (err) {
            console.log(err)
        }
    })
}