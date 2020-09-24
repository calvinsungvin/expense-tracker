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
    const record = req.body
    return Record.create(record)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

//edit page
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Record.findById(id)
        .lean()
        .then((record) => res.render('edit', { record }))
        .catch(error => console.log(error))
})

//edit expense
router.put('/:id', (req, res) => {
    const id = req.params.id
    return Record.findById(id)
        .then(record => {
            record = Object.assign(record, req.body)
            return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

//delete expense
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Record.findById(id)
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router