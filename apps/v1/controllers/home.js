'use strict'

const debug = require('debug')
const _ = require('lodash')
const Kamar = require('../queries/kamar')
const Asrama = require('../queries/asrama')
const Tamu = require('../queries/tamu')
const Asset = require('../queries/asset')
const Logs = require('../queries/logs')
const Dashboard = require('../queries/dashboard')
const Lantai = require('../queries/lantai')
const os = require('os')

async function indexPage (req, res) {
    let log = debug('esima:home:indexPage')
    log('[esima][home] indexPage')
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken
        if (req.session.user) {
            session
        } else {
            session = null
        }
        const result = await Dashboard.getTotalData(token)
        log('result', result)
        const lantai = await Lantai.getLantai(token)
        log('lantai', lantai)
        // const result = await Kamar.findLantai(data)
        // log('result', result)

        res.render('../views/pages/peserta/', { 
            session: req.session.user,
            page_name: 'home',
            lantai: _.isEmpty(lantai) ? [] : lantai,
            result: _.isEmpty(result) ? [] : result,
            dataAsramaL: _.isEmpty(result) ? [] : result.dataAsramaL,
            dataAsramaP: _.isEmpty(result) ? [] : result.dataAsramaP,
        })
    } catch (error) {
        throw error
    }
}

module.exports = {
    indexPage
}