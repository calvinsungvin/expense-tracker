const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
// const FacebookStrategy = require('passport-facebook').Strategy

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


    // passport.use(new FacebookStrategy({
    //     clientID: process.env.FACEBOOK_ID,
    //     clientSecret: process.env.FACEBOOK_SECRET,
    //     callbackURL: process.env.FACEBOOK_CALLBACK,
    //     profileFields: ['email', 'displayName']
    // }, (accessToken, refreshToken, profile, done) => {
    //     const { name, email } = profile._json
    //     User.findOne({ email })
    //         .then(user => {
    //             if (user) return done(null, user)
    //             const randomPassword = Math.random().toString(36).slice(-8)
    //             bcrypt
    //                 .genSalt(10)
    //                 .then(salt => bcrypt.hash(randomPassword, salt))
    //                 .then(hash => User.create({ name, email, password: hash }))
    //                 .then(user => done(null, user))
    //                 .catch(err => done(err, false))
    //         })
    // }))



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