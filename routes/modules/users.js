const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users.login'
}))

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: 'All fields are required！' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: 'Password and Confirm Password do not match！' })
    }
    if (errors.length) {
        return res.render('register', { errors, name, email, password, confirmPassword })
    }
    User.findOne({email})
        .then(user => {
            if (user) {
                errors.push({ message: 'Email has already existed.' })
                return res.render('register', { errors, name, email, password, confirmPassword })
            }
            return bcrypt
                .genSalt(10)
                .then(salt => bcrypt.hash(password, salt))
                .then(hash => User.create({ name, email, password: hash }))
                .then(() => res.redirect('login'))
                .catch(err => console.log(err))
        })
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'Logged out Successfully！')
    res.redirect('/users/login')
})

module.exports = router 
