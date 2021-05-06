'use strict'

const debug = require('debug')
const _ = require('lodash')
const Logs = require('../queries/logs')
const os = require('os')

async function indexPage (req, res) {
    let log = debug('esima:logs:indexPage')
    log('[esima][logs] indexPage')
    try {
        let session = req.session.user
        if (req.session.user) {
            session
        } else {
            session = null
        }
        res.render('../views/pages/log/', { 
            session: req.session.user,
            page_name: 'logs'
        })
    } catch (error) {
        throw error
    }
}

async function getAll (req, res, next) {
    let log = debug('esima:logs:getAll')
    let data = req.body
    log('[esima][logs] getAll', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const result = await Logs.findAll(data, token)

        return res.send(result).data
    } catch (error) {
        throw error
    }
}

function insertLogs (notes) {
    let log = debug('esima:logs:create')
    log('[esima][logs] create', notes)
    try {
        const created = Logs.create({
            ipaddress: notes.ipaddress,
            id_users: notes.id_users,
            browser: notes.browser, 
            browser_version: notes.browser_version,
            os: notes.os, 
            logdetail: notes.logdetail,
            hostname: os.hostname(),
            token: notes.token
        })
    } catch (error) {
        throw error
    }
}

module.exports = {
    indexPage,
    getAll,
    insertLogs
}