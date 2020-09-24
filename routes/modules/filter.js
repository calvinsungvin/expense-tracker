const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { collections } = require('../../config/mongoose')
const Handlebars = require('handlebars')

router.get('/', (req, res) => {
    const { month, category } = req.query
    const categoryQuery = req.query.category
    const monthQuery = req.query.month
    const userId = req.user._id
    let allQuery = ''
    if (req.query.category !== 0 && req.query.month !== 0) {
        allQuery = `${month} ${category}`
    }

    Handlebars.registerHelper('categoryQueryHelper', function (options) {return options.fn(this)})

    Record.find({ userId })
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
            //filter月份邏輯
            const createD = records.map(record => record.date)
            const createYM = []
            const existYM = []
            createD.forEach(element => {
                if (element) {
                    createYM.push(element.substr(0, 7))
                }
            })
            for (let i = 0; i < createYM.length; i++) {
                if (createYM[i].includes(createYM[i - 1]) !== true) {
                    existYM.push(createYM[i])
                }
            }
            //比對月份
            if (month !== null) {
                // } else {
                for (let i = 0; i < records.length; i++) {
                    if (records[i].date.substr(0, 7).includes(month) !== true) {
                        records.splice(i, 1)
                        i--
                    }
                }
            }
            //比對分類
            Category.find()
                .lean()
                .sort({ _id: 'asc' })
                .then(categories => {
                    if (category.length !== 0) {
                        const englishCategoryName = categories.categoryEnglishName
                        let chineseCategoryName = ''
                        categories.forEach(element => {
                            if (element.categoryEnglishName.includes(category) === true) {
                                chineseCategoryName = element.categoryName
                                for (let i = 0; i < records.length; i++) {
                                    if (records[i].category.includes(chineseCategoryName) !== true) {
                                        records.splice(i, 1)
                                        i--
                                    }
                                }
                            }
                        })
                    }
                    // 計算
                    const totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0)
                    res.render('index', { records, totalAmount, categories, existYM, allQuery, categoryQuery, monthQuery })
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
})

module.exports = router;
