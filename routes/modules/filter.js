const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/filter/:category', (req, res) => {
   Category.find()
    .lean()
    .then(categories => {
        return Record.find({ category: `${req.params.category}` })
        .lean()
        .then(record => {
            let totalAmount = 0
            for (let i = 0; i < record.length; i++)
            totalAmount += record[i].amount
        })
        const params = req.params.category
        res.render('index', { record, categories, totalAmount, params })
    })
    .catch(error => console.log(error))
})



module.exports = router;
