const Category = require('../category.js')
const db = require('../../config/mongoose.js')

db.once('open', () => {
  const categoryName = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
  for (let i = 0; i < categoryName.length; i++) {
    Category.create({ name: categoryName[i] })
      .then(() => {
        db.close()
        console.log('Category done!')
      })
      .catch(error => console.log(error))
  }
})