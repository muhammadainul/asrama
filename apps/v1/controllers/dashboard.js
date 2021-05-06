'use strict'

const debug = require('debug')
const _ = require('lodash')
const Dashboard = require('../queries/dashboard')
const Lantai = require('../queries/lantai')
const { isEmpty } = require('lodash')

async function indexPage (req, res) {
    let log = debug('esima:index:indexPage')
    log('[esima][index] indexPage')
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

        res.render('../views/pages/dashboard/', { 
            session: req.session.user,
            page_name: 'dashboard',
            dataAsramaL: isEmpty(result) ? [] : result.dataAsramaL,
            dataAsramaP: isEmpty(result) ? [] : result.dataAsramaL,
            lantai: isEmpty(lantai) ? [] : lantai,
            result: isEmpty(result) ? [] : result
        })
    } catch (error) {
        throw error
    }
}

async function getReport (req, res) {
    let log = debug('esima:index:getReport')
    let data = req.body
    log('[esima][index] getReport', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const result = await Dashboard.getTotalData(token)
        return res.send(result)
    } catch (error) {
        throw error
    }
}

module.exports = {
    indexPage,
    getReport
}