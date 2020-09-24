const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Category.findByIdAndUpdate({_id, userId})
    .lean()
    .sort({_id:'asc'})
    .then(categories => {
        Record.find({userId})
            .lean()
            .sort({ date:'desc' })
            .then(recordlist => {
                let categoryAmount = [0]
                let categoryList = []
                for (i in recordlist) {
                    if (categories.categoryName === recordlist[a].category){
                        categoryAmount.push(recordlist[a].amount)
                        categoryList.push(recordlist[a])
                    }
                }
                const records = categoryList
                const totalAmount = categoryAmount.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0)
                    Category.find()
                    .lean()
                    .sort({ _id: 'asc' })
                    .then( categorieslist => {
                        const categories = categorieslist
                        res.render('index', { totalAmount, records, categories })
                    })
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
})



module.exports = router;
