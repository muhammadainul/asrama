'use strict'

const debug = require('debug')
const _ = require('lodash')
const Kamar = require('../queries/kamar')
const Asrama = require('../queries/asrama')
const Tamu = require('../queries/tamu')
const Asset = require('../queries/asset')
const Logs = require('../queries/logs')
const Lantai = require('../queries/lantai')
const os = require('os')

async function indexPage (req, res) {
    let log = debug('esima:kamar:indexPage')
    log('[esima][kamar] indexPage')
    try {
        let token = req.session.user.session.accessToken
        let session = req.session.user
        if (req.session.user) {
            session
        } else {
            session = null
        }

        const asrama = await Asrama.getAsrama(token)
        log('asrama', asrama)

        res.render('../views/pages/kamar/', { 
            session: req.session.user,
            page_name: 'kamar',
            asrama
        })
    } catch (error) {
        throw error
    }
}

async function addPage (req, res) {
    let data = req.body
    let log = debug('esima:kamar:addPage')
    log('[esima][kamar] addPage', data)
    try {
        const success = ''
        let session = req.session.user
        let token = req.session.user.session.accessToken

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

        const asrama = await Asrama.getAsrama(token)
        const lantai = await Lantai.getLantai(token)

        res.render('../views/pages/kamar/tambah', { 
            session: req.session.user,
            errors: errors,
            asrama,
            lantai,
            id_lantai: data.id_lantai,
            id_asrama: data.id_asrama,
            success,
            page_name: 'kamar'
        })
    } catch (error) {
        throw error
    }
}

async function editPage (req, res, next) {
    let log = debug('esima:kamar:editPage')
    let param = req.params
    log('[esima][kamar] ediPage', param)
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

        const kamar = await Kamar.findKamarData(param.id, token)
        const asrama = await Asrama.getAsrama(token)
        const lantai = await Lantai.getLantai(token)
        res.render('pages/kamar/edit', { 
            session: req.session.user,
            kamar, 
            asrama,
            lantai, 
            errors, 
            success, 
            page_name: 'kamar' 
        })
    } catch (error) {
        throw error
    }
}

async function detailKamar (req, res, next) {
    let log = debug('esima:kamar:detailKamar')
    let data = req.body
    log('[esima][kamar] detailKamar', { data })
    try {
        let param = req.params
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const result = await Tamu.findDataTamu(param.id, token)
        const kamar = await Kamar.findKamarData(param.id, token)
        const asset = await Asset.findAssetByIdKamar(param.id, token)

        res.render('pages/kamar/detail', { session: req.session.user, result, kamar, asset, page_name: 'kamar' })
    } catch (error) {
        throw error
    }
}

async function getAll (req, res, next) {
    let log = debug('esima:kamar:getAll')
    let data = req.body
    log('[esima][kamar] getAll', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const result = await Kamar.findAll(data, token)
        return res.send(result).data
    } catch (error) {
        throw error
    }
}

async function getLantai (req, res, next) {
    let log = debug('esima:kamar:getLantai')
    let data = req.body
    log('[esima][kamar] getLantai', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const result = await Kamar.findLantai(data, token)
        log('resultOK', result)
        const lantai = await Lantai.getLantai(token)
        log('lantai', lantai)

        if (session.data.kewenangan_id == 1) {
            return res.render('../views/pages/dashboard/', { 
                session: req.session.user,
                page_name: 'dashboard',
                dataAsramaL: result.dataAsramaL,
                dataAsramaP: result.dataAsramaP,
                lantai, 
                result
            })
        } else {
            return res.render('../views/pages/peserta/', { 
                session: req.session.user,
                page_name: 'home',
                dataAsramaL: result.dataAsramaL,
                dataAsramaP: result.dataAsramaP,
                lantai, 
                result
            })
        }
    } catch (error) {
        throw error
    }
}

async function addKamar (req, res, next) {
    let log = debug('esima:kamar:addKamar')
    let data = req.body
    let files = req.file
    log('[esima][kamar] addKamar', data, files)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken
        const lantai = await Lantai.getLantai(token)
        const asrama = await Asrama.getAsrama(token)

        const created = await Kamar.create({
            files,
            nama_kamar: data.nama_kamar,
            kapasitas: data.kapasitas,
            id_asrama: data.id_asrama,
            id_lantai: data.id_lantai,
            token
        })
        if (created.status == 400) return res.render('pages/kamar/tambah', { 
            session: req.session.user,
            errors: created.message,
            success: '',
            lantai,
            nama_kamar: data.nama_kamar,
            kapasitas: data.kapasitas,
            id_asrama: data.id_asrama,
            id_lantai: data.id_lantai,
            asrama,
            page_name: 'kamar'
        })
        if (created.status == 200){
            res.render('pages/kamar/tambah', { 
                session: req.session.user,
                errors: '',
                success: created.message,
                nama_kamar: data.nama_kamar,
                kapasitas: data.kapasitas,
                id_asrama: data.id_asrama,
                id_lantai: data.id_lantai,
                lantai,
                asrama,
                page_name: 'kamar'
            })
            const logs = await Logs.create({ 
                ipaddress: req.connection.remoteAddress, 
                id_users: `${req.session.user.data.id}`,
                browser: data.browser, 
                browser_version: data.browser_version,
                os: data.os,
                logdetail: 'Tambah Data Kamar',
                hostname: os.hostname(),
                token
            })
        } 
    } catch (error) {
        throw error
    }
}

async function editKamar (req, res, next) {
    let log = debug('esima:kamar:editKamar')
    let data = req.body
    let files = req.file
    log('[esima][kamar] editKamar', data, files)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const asrama = await Asrama.getAsrama(token)
        const lantai = await Lantai.getLantai(token)
        const kamar = await Kamar.findKamarData(data.id, token)    

        const edited = await Kamar.editById({
            files,
            id: data.id,
            idGambar: data.idGambar,
            nama_kamar: data.nama_kamar,
            tipe_kamar: data.tipe_kamar,
            kapasitas: data.kapasitas,
            id_asrama: data.id_asrama,
            id_lantai: data.id_lantai,
            token
        })
        if (edited.status == 400) return res.render('pages/kamar/edit', { 
            session: req.session.user,
            errors: edited.message,
            nama_kamar: data.nama_kamar,
            tipe_kamar: data.tipe_kamar,
            kapasitas: data.kapasitas,
            id_asrama: data.id_asrama,
            id_lantai: data.id_lantai,
            kamar,
            asrama,
            lantai,
            page_name: 'kamar'
        })

        if (edited.status == 200) {
            const logs = await Logs.create({ 
                ipaddress: req.connection.remoteAddress, 
                id_users: `${req.session.user.data.id}`,
                browser: data.browser, 
                browser_version: data.browser_version,
                os: data.os,
                logdetail: 'Edit Data Kamar',
                hostname: os.hostname(),
                token
            })
            res.render('pages/kamar/edit', { 
                session: req.session.user,
                success: edited.message,
                errors: '',
                nama_kamar: data.nama_kamar,
                tipe_kamar: data.tipe_kamar,
                kapasitas: data.kapasitas,
                id_asrama: data.id_asrama,
                id_lantai: data.id_lantai,
                kamar,
                asrama,
                lantai,
                page_name: 'kamar'
            })
        }
    } catch (error) {
        throw error
    }
}

async function deleteKamar (req, res, next) {
    let log = debug('esima:kamar:deleteKamar')
    let data = req.body
    log('[esima][kamar] deleteKamar', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const id = data.id
        const deleted = await Kamar.deleteKamar(id, token)
        if (deleted.status == 200) {
            const logs = await Logs.create({ 
                ipaddress: req.connection.remoteAddress, 
                id_users: `${req.session.user.data.id}`,
                browser: data.browser, 
                browser_version: data.browser_version,
                os: data.os,
                logdetail: 'Hapus Data Kamar',
                hostname: os.hostname(),
                token
            })
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    indexPage,
    addPage,
    editPage,
    detailKamar,
    getAll,
    getLantai,
    addKamar,
    editKamar,
    deleteKamar
}