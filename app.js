
require('./config/mongoose')
const express = require('express')
const session = require('express-session')
const app = express()
const port = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const userPassport = require('./config/passport')
const flash = require('connect-flash')


//handlebars setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'MySecret',
  resave: false,
  saveUninitialized: true
}))
//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }))

//static files setup
app.use(express.static('public'))

//method-override
app.use(methodOverride('_method'))

userPassport(app)
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})

// showing pages
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})