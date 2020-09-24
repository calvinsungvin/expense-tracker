const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const filter = require('./modules/filter')
const users = require('./modules/users')
const records = require('./modules/records')
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')



router.use('/records', authenticator, records)
router.use('/filter', authenticator, filter)
router.use('/users', users)
router.use('/', authenticator, home)
router.use('/auth', auth)


module.exports = router
