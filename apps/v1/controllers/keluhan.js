'use strict'

const debug = require('debug')
const _ = require('lodash')
const Keluhan = require('../queries/keluhan')
const Kamar = require('../queries/kamar')
const Asrama = require('../queries/asrama')
const Logs = require('../queries/logs')
const os = require('os')

async function indexPage (req, res) {
    let log = debug('esima:keluhan:indexPage')
    log('[esima][keluhan] indexPage')
    try {
        let token = req.session.user.session.accessToken
        let session = req.session.user

        const asrama = await Asrama.getAsrama(token)

        if (req.session.user) {
            session
        } else {
            session = null
        }
        
        if (session.data.kewenangan_id == 1) {
            res.render('../views/pages/keluhan/', { 
                session: req.session.user,
                page_name: 'keluhan',
                asrama
            })
        } else {
            res.render('../views/pages/peserta/keluhan', { session, page_name: 'keluhan' })
        }
        
    } catch (error) {
        throw error
    }
}

async function getAll (req, res, next) {
    let log = debug('esima:keluhan:getAll')
    let data = req.body
    log('[esima][keluhan] getAll', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        data.searchOrder = ""
        if (data.order[0].dir == "desc") {
            data.searchOrder = "-" + data.searchOrder;
        }
        const result = await Keluhan.findAll(data, token)
        log('result')

        return res.send(result).data
    } catch (error) {
        throw error
    }
}

async function addKeluhan (req, res, next) {
    let log = debug('esima:keluhan:addKeluhan')
    let data = req.body
    log('[esima][keluhan] addKeluhan', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        let keluhan = data.keluhan
        keluhan.trim()
        const created = await Keluhan.create({
            nama: data.nama,
            keluhan: data.keluhan,
            id_kamar: `${session.data.id_kamar}`,
            id_asrama: `${session.data.id_asrama}`,
            token
        })
        log('keluhan', created)

        const logs = await Logs.create({ 
            ipaddress: req.connection.remoteAddress, 
            id_users: `${req.session.user.data.id}`,
            browser: data.browser, 
            browser_version: data.browser_version,
            os: data.os,
            logdetail: 'Tambah Data Keluhan',
            hostname: os.hostname(),
            token 
        })
        log('logs', logs)
    } catch (error) {
        throw error
    }
}

async function prosesKeluhan (req, res, next) {
    let log = debug('esima:keluhan:prosessKeluhan')
    let data = req.body
    log('[esima][keluhan] prosessKeluhan', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const processed = await Keluhan.updateStatus(data.id, token)
        log('keluhan', processed)

        const logs = await Logs.create({ 
            ipaddress: req.connection.remoteAddress, 
            id_users: `${req.session.user.data.id}`,
            browser: data.browser, 
            browser_version: data.browser_version,
            os: data.os,
            logdetail: 'Proses Keluhan',
            hostname: os.hostname(),
            token
        })
        log('logs', logs)
    } catch (error) {
        throw error
    }
}

module.exports = {
    indexPage,
    getAll,
    addKeluhan,
    prosesKeluhan
}