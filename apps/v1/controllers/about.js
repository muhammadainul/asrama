'use strict'

const debug = require('debug')
const _ = require('lodash')
const Kamar = require('../queries/kamar')
const Asrama = require('../queries/asrama')
const Tamu = require('../queries/tamu')
const Asset = require('../queries/asset')
const Logs = require('../queries/logs')
const os = require('os')

async function indexPage (req, res) {
    let log = debug('esima:about:indexPage')
    log('[esima][about] indexPage')
    try {
        let session = req.session.user
        if (req.session.user) {
            session
        } else {
            session = null
        }
        res.render('../views/pages/peserta/about', { 
            session: req.session.user,
            page_name: 'about'
        })
    } catch (error) {
        throw error
    }
}

module.exports = {
    indexPage
}