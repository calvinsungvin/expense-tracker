const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
    name: 'User',
    email: 'user@example.com',
    password: '123456'
}

const SEED_EXPENSE = [
    {
        name: "早餐",
        category: "餐飲食品",
        merchant: "美之城",
        date: "2020-08-03",
        amount: "80",
    },
    {
        name: "健身",
        category: "休閒娛樂",
        merchant: "World Gym",
        date: "2020-08-03",
        amount: "50",
    },
    {
        name: "房租",
        category: "家居物業",
        merchant: "hot landlord",
        date: "2020-08-03",
        amount: "25000",
    },
    {
        name: "搭公車",
        category: "交通出行",
        merchant: "Taipei Government",
        date: "2020-08-03",
        amount: "36",
    }
]

db.once('open', () => {
    bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash => User.create({
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: hash
        }))
        .then(user => {
            const userId = user._id
            return Promise.all(Array.from(
                { length: 4 },
                (_, i) =>
                    Record.create({
                        name: SEED_EXPENSE[i].name,
                        category: SEED_EXPENSE[i].category,
                        date: SEED_EXPENSE[i].date,
                        amount: SEED_EXPENSE[i].amount,
                        userId
                    })
            ))

        })
        .then(() => {
            console.log('recordSeeder done!')
            // db.close()
            process.exit()
        })
})
