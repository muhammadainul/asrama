'use strict'

const debug = require('debug')
const _ = require('lodash')
const Notifikasi = require('../queries/notifikasi')

async function getNotif (req, res, next) {
    let log = debug('esima:notifikasi:getNotif')
    let data = req.body
    log('[esima][notifikasi] getNontif', data)
    try {
        let token = req.session.user.session.accessToken
        const result = await Notifikasi.getData(token)
        log('result', result)

        return res.send(result)
    } catch (error) {
        throw error
    }
}

module.exports = {
    getNotif    
}