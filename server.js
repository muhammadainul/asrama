'use strict'

const express = require('express')
const path = require('path')
const crypto = require('crypto')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const router = require('./apps/v1/routes/index')
const session = require('express-session')
const passport = require('passport')
// const myConfig = require('./config/config')
const app = express()   

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(flash())
app.use(express.static(path.join(__dirname, 'assets')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
app.use(cookieParser())
app.use(session({
    secret              : crypto.randomBytes(50).toString('hex'),
    cookie              : { maxAge: 7200000 },
    resave              : false,
    saveUninitialized   : false
}))
// passport
require('./apps/v1/config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions

app.use('/', router)

const port = 3007
app.listen(port, () => {
    console.log('Server listening at http://localhost:' + port)
})