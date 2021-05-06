'use strict'

const passport = require('passport')

const isSecured = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log('err, user', { err, user, info })
        if (err) return res.send(err)
        if (!user) return res.redirect('/')
        req.logIn(user, { session: false }, err => {
            if (err) return res.send(err)
            
            next()
        })
    })(req, res, next)
}

module.exports = isSecured