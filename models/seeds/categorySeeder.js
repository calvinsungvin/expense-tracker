if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category')
const db = require('../../config/mongoose')
db.once('open', () => {
  console.log('mongodb conneted!')
  Category.create(
      {
          categoryName: "家居物業",
          categoryEnglishName: "houseware",
          categoryIcon: "fas fa-home"
      },
      {
          categoryName: "交通出行",
          categoryEnglishName: "traffic",
          categoryIcon: "fas fa-shuttle-van"
      },
      {
          categoryName: "休閒娛樂",
          categoryEnglishName: "entertainment",
          categoryIcon: "fas fa-grin-beam"
      },
      {
          categoryName: "餐飲食品",
          categoryEnglishName: "food",
          categoryIcon: "fas fa-utensils"
      },
      {
          categoryName: "其他",
          categoryEnglishName: "other",
          categoryIcon: "fas fa-pen"
      }
  )
  .then(() => {
      console.log('categorySeeder done!')
      db.close()
  })
})

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }
// const Category = require('../category.js')
// const db = require('../../config/mongoose.js')

// db.once('open', () => {
//   const categoryName = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
//   for (let i = 0; i < categoryName.length; i++) {
//     Category.create({ name: categoryName[i] })
//       .then(() => {
//         db.close()
//         console.log('Category done!')
//       })
//       .catch(error => console.log(error))
//   }
// })