const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const handlebars = require("handlebars")

handlebars.registerHelper('checkIfSam', (a, b, options) => {
    if (a === b) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  })

//index page
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
      .lean()
      .sort({ date: 'desc' })
      .then(records => {
          const totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0)
          Category.find()
              .lean()
              .sort({ _id: 'asc' })
              .then(categories => {
                  res.render('index', { records, totalAmount, categories })
              })
              .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
})

//create page
// router.get('/new', (req, res) => {
//     return res.render('new')
// })

// router.post('/', (req, res) => {
//     const { name, date, category, amount } = req.body
//     if (category === undefined) {
//       const alert = '請選擇支出類別'
//       return Category.find()
//         .lean()
//         .then(categories => {
//           res.render('new', { alert, categories, name, date, amount })
//         })
//         .catch(error => console.log(error))
//     }
//     Record.create(req.body)
//       .then(() => res.redirect('/'))
//       .catch(error => console.log(error))
//   })

//edit 
// router.get('/:id/edit', (req, res) => {
//     const id = req.params.id
//     return Record.findById(id)
//         .lean()
//         .then((record) => res.render('edit', { record }))
//         .catch(error => console.log(error))
// })

// router.put('/:id', (req, res) => {
//     const id = req.params.id
//     return Record.findById(id)
//         .then(record => {
//             record = Object.assign(record, req.body)
//             return record.save()
//         })
//         .then(() => res.redirect('/'))
//         .catch(error => console.log(error))
// })

//delete
// router.delete('/:id', (req, res) => {
//     const id = req.params.id
//     return Record.findById(id)
//         .then(record => record.remove())
//         .then(() => res.redirect('/'))
//         .catch(error => console.log(error))
// })


module.exports = router


