const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const filter = require('./modules/filter')

router.use('/', home)
router.use('/filter', filter)



module.exports = router
