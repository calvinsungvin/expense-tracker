if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record.js')
const db = require('../../config/mongoose.js')

db.once('open', () => {
  Record.create(
    {
      name: '公車',
      category: '交通出行',
      date: '2020-07-16',
      amount: 50
    },
    {
      name: '午餐',
      category: '餐飲食品',
      date: '2020-07-15',
      amount: 60
    },
    {
      name: '電動',
      category: '休閒娛樂',
      date: '2020-07-17',
      amount: 500
    },
    {
      name: '掃把',
      category: '家居物業',
      date: '2020-07-17',
      amount: 100
    },
    {
      name: '糖果',
      category: '其他',
      date: '2020-07-17',
      amount: 100
    }
  )
    .then(() => {
      db.close()
      console.log('Record done!')
    })
    .catch(error => console.log(error))
})