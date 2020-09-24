const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

//create page
router.get('/new', (req, res) => {
    return res.render('new')
})

//create expense
router.post('/', (req, res) => {
    const userId = req.user._id
    const { name, category, date, amount } = req.body
    console.log(req.body)
    return Record.create({ name, category, date, amount, userId})
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


//edit page
router.get('/:id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId })
        .lean()
        .then((record) => res.render('edit', { record }))
        .catch(error => console.log(error))
})

//edit expense
router.put('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId })
        .then(record => {
            record = Object.assign(record, req.body)
            return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

//delete expense
router.delete('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId })
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router