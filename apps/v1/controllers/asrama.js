'use strict'

const debug = require('debug')
const _ = require('lodash')
const Asrama = require('../queries/asrama')
const Logs = require('../queries/logs')
const Log = require('./logs')
const os = require('os')

async function indexPage (req, res) {
    let log = debug('esima:asrama:indexPage')
    log('[esima][asrama] indexPage')
    try {
        let session = req.session.user
        if (req.session.user) {
            session
        } else {
            session = null
        }
        res.render('pages/asrama/index', { 
            session: req.session.user,
            page_name: 'asrama'
        })
    } catch (error) {
        throw error
    }
}

async function addPage (req, res) {
    let log = debug('esima:asrama:tambahPage')
    log('[esima][asrama] tambahPage')
    try {
        const success = ''
        let session = req.session.user
        if (req.session.user) {
            session
        } else {
            session = null
        }

        let errors = req.flash('error')
        if (errors.length > 0) {
            errors = errors[0]
        } else {
            errors = null
        }

        res.render('pages/asrama/tambah', { 
            session: req.session.user,
            errors: errors,
            success,
            page_name: 'asrama'
        })
    } catch (error) {
        throw error
    }
}

async function editPage (req, res, next) {
    let log = debug('esima:asrama:editPage')
    let param = req.params
    log('[esima][asrama] ediPage', param)
    try {
        const success = ''
        let session = req.session.user
        let token = req.session.user.session.accessToken
        let errors = req.flash('error')
        if (errors.length > 0) {
            errors = errors[0]
        } else {
            errors = null
        }

        let asrama = await Asrama.findAsramaData(param.id, token)
        res.render('pages/asrama/edit', { 
            session: req.session.user,
            asrama, 
            errors, 
            success,
            page_name: 'asrama' 
        })
    } catch (error) {
        throw error
    }
}

async function getAll (req, res, next) {
    let log = debug('esima:asrama:getAll')
    let data = req.body
    log('[esima][asrama] getAll', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        data.searchOrder = ""
        if (data.order[0].dir == "desc") {
            data.searchOrder = "-" + data.searchOrder;
        }
        const result = await Asrama.findAll(data, token)
        log('result')

        return res.send(result).data
    } catch (error) {
        throw error
    }
}

async function addAsrama (req, res) {
    let log = debug('esima:asrama:addAsrama')
    let data = req.body
    let files = req.file
    log('[esima][asrama] addAsrama', { data, files })
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const created = await Asrama.create({
            files,
            nama_asrama: data.nama_asrama,
            jumlah_kamar: data.jumlah_kamar,
            jumlah_lantai: data.jumlah_lantai,
            fasilitas: data.fasilitas,
            token
        })
        
        if (created.statusCode == 400) return res.render('pages/asrama/tambah', { 
            session: req.session.user,
            errors: created.message,
            success: '',
            nama_asrama: data.nama_asrama,
            jumlah_kamar: data.jumlah_kamar,
            jumlah_lantai: data.jumlah_lantai,
            fasilitas: data.fasilitas,
            page_name: 'asrama'
        })

        if (created.statusCode == 200) res.render('pages/asrama/tambah', {
            session: req.session.user,
            errors: '',
            success: created.message,
            nama_asrama: data.nama_asrama,
            jumlah_kamar: data.jumlah_kamar,
            jumlah_lantai: data.jumlah_lantai,
            fasilitas: data.fasilitas,
            page_name: 'asrama'
        })

        const notes = {
            ipaddress: req.connection.remoteAddress,
            id_users: `${req.session.user.data.id}`,
            browser: data.browser, 
            browser_version: data.browser_version,
            os: data.os,
            logdetail: 'Tambah Data Asrama',
            token: req.session.user.session.accessToken
        }
        const logs = await Log.insertLogs(notes)
    } catch (error) {
        throw error
    }
}

async function editAsrama (req, res, next) {
    let log = debug('esima:asrama:editAsrama')
    let data = req.body
    let files = req.file
    log('[esima][asrama] editAsrama', { data, files })
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const edited = await Asrama.editById({
            files,
            nama_asrama: data.nama_asrama,
            jumlah_kamar: data.jumlah_kamar,
            jumlah_lantai: data.jumlah_lantai,
            fasilitas: data.fasilitas,
            idGambar: data.idGambar,
            id: data.id,
            token
        })
        const asrama = await Asrama.findAsramaData(data.id, token)

        if (edited.statusCode == 400) return res.render('pages/asrama/edit', { 
            session: req.session.user,
            errors: created.message,
            asrama,
            nama_asrama: data.nama_asrama,
            jumlah_kamar: data.jumlah_kamar,
            jumlah_lantai: data.jumlah_lantai,
            fasilitas: data.fasilitas,
            page_name: 'asrama'
        })

        if (edited.statusCode == 200) { 
            const notes = ({ 
                ipaddress: req.connection.remoteAddress, 
                id_users:`${req.session.user.data.id}`,
                browser: data.browser, 
                browser_version: data.browser_version,
                os: data.os,
                logdetail: 'Edit Data Asrama',
                hostname: os.hostname(),
                token: req.session.user.session.accessToken
            })
            const logs = await Log.insertLogs(notes)

            return res.render('pages/asrama/edit', {
                session: req.session.user,
                errors: '',
                success: edited.message,
                asrama,
                nama_asrama: data.nama_asrama,
                jumlah_kamar: data.jumlah_kamar,
                jumlah_lantai: data.jumlah_lantai,
                fasilitas: data.fasilitas,
                page_name: 'asrama'
            })
        }
    } catch (error) {
        throw error
    }
}

async function deleteAsrama (req, res, next) {
    let log = debug('esima:asrama:deleteAsrama')
    let data = req.body
    log('[esima][asrama] deleteAsrama', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const id = data.id
        const deleted = await Asrama.deleteAsrama(id, token)

        const notes = ({ 
            ipaddress: req.connection.remoteAddress, 
            id_users: `${req.session.user.data.id}`,
            browser: data.browser, 
            browser_version: data.browser_version,
            os: data.os,
            logdetail: 'Hapus Data Asrama',
            hostname: os.hostname() ,
            token: req.session.user.session.accessToken
        })
        const logs = await Log.insertLogs(notes)
    } catch (error) {
        throw error
    }
}

module.exports = {
    indexPage,
    addPage,
    editPage,
    getAll,
    editAsrama,
    addAsrama,
    deleteAsrama
}