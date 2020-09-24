const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
    categoryName: {
        type: String,
        require: true
    },
    categoryEnglishName: {
        type: String,
        require: true
    },
    categoryIcon: {
        type: String,
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    }
})
module.exports = mongoose.model('Category', categorySchema)