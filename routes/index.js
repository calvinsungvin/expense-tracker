const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const filter = require('./modules/filter')
const users = require('./modules/users')
const records = require('./modules/records')



router.use('/', home)
router.use('/filter', filter)
router.use('/users', users)
router.use('/records', records)



module.exports = router
