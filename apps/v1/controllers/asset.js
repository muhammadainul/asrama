'use strict'

const debug = require('debug')
const _ = require('lodash')
const Asset = require('../queries/asset')
const KategoriAsset = require('../queries/kategoriAsset')
const Asrama = require('../queries/asrama')
const Kamar = require('../queries/kamar')
const Logs = require('../queries/logs')
const os = require('os')

async function indexPage (req, res) {
    let log = debug('esima:asset:indexPage')
    log('[esima][asset] indexPage')
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken
        const asrama = await Asrama.getAsrama(token)
        const kategoriAsset = await KategoriAsset.getKategoriAsset(token)

        if (req.session.user) {
            session
        } else {
            session = null
        }
        res.render('pages/asset/index', { 
            session: req.session.user,
            page_name: 'asset',
            asrama,
            kategoriAsset
        })
    } catch (error) {
        throw error
    }
}

async function addPage (req, res) {
    let log = debug('esima:asset:tambahPage')
    log('[esima][asset] tambahPage')
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
        log('ASRAMA', asrama)
        const kamar = await Kamar.getKamar(token)
        const kategoriAsset = await KategoriAsset.getKategoriAsset(token)

        res.render('pages/asset/tambah', { 
            session: req.session.user,
            errors: errors,
            success,
            session,
            asrama,
            kamar,
            kategoriAsset,
            page_name: 'asset'
        })
    } catch (error) {
        throw error
    }
}

async function editPage (req, res, next) {
    let log = debug('esima:asset:editPage')
    let param = req.params
    log('[esima][asset] editPage', param)
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

        const asset = await Asset.findAsset(param.id, token)
        const asrama = await Asrama.getAsrama(token)
        const kamar = await Kamar.getKamar(token)
        const kategoriAsset = await KategoriAsset.getKategoriAsset(token)
        
        res.render('pages/asset/edit', { 
            session: req.session.user,
            asset,
            asrama,
            kamar,
            kategoriAsset,
            errors,
            success,
            page_name: 'asset'
        })
    } catch (error) {
        throw error
    }
}

async function getAll (req, res, next) {
    let log = debug('esima:asset:getAll')
    let data = req.body
    log('[esima][asset] getAll', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        data.searchOrder = ""
        if (data.order[0].dir == "desc") {
            data.searchOrder = "-" + data.searchOrder;
        }
        const result = await Asset.findAll(data, token)
        log('result')

        return res.send(result).data
    } catch (error) {
        throw error
    }
}

async function addAsset (req, res) {
    let log = debug('esima:asset:addAsset')
    let data = req.body
    let files = req.file
    log('[esima][asset] addAsset', data, files)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const asrama = await Asrama.getAsrama(token)
        const kamar = await Kamar.getKamar(token)
        const kategoriAsset = await KategoriAsset.getKategoriAsset(token)

        const created = await Asset.create({
            files,
            nama_asset: data.nama_asset,
            id_kategori: data.id_kategori,
            id_asrama: data.id_asrama,
            id_kamar: data.id_kamar,
            token
        })
        if (created.status == 400) return res.render('pages/asset/tambah', { 
            session: req.session.user,
            errors: created.message,
            nama_asset: data.nama_asset,
            id_kategori: data.id_kategori,
            id_asrama: data.id_asrama,
            id_kamar: data.id_kamar,
            asrama,
            kamar,
            kategoriAsset,
            page_name: 'asset'
        })
        if (created.status == 200) { 
            res.render('pages/asset/tambah', { 
                session: req.session.user,
                success: created.message,
                errors: '',
                nama_asset: data.nama_asset,
                id_kategori: data.id_kategori,
                id_asrama: data.id_asrama,
                id_kamar: data.id_kamar,
                asrama,
                kamar,
                kategoriAsset,
                page_name: 'asset'
            })
            const logs = await Logs.create({ 
                ipaddress: req.connection.remoteAddress, 
                id_users: `${req.session.user.data.id}`,
                browser: data.browser, 
                browser_version: data.browser_version,
                os: data.os,
                logdetail: 'Tambah Data Asset',
                hostname: os.hostname(),
                token
            })
        }
    } catch (error) {
        throw error
    }
}

async function editAsset (req, res) {
    let log = debug('esima:asset:editAsset')
    let data = req.body
    let files = req.file
    log('[esima][asset] editAsset', data, files)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const asset = await Asset.findAsset(data.id, token)
        const asrama = await Asrama.getAsrama(token)
        const kamar = await Kamar.getKamar(token)
        const kategoriAsset = await KategoriAsset.getKategoriAsset(token)

        const edited = await Asset.editById({
            files,
            id: data.id,
            nama_asset: data.nama_asset,
            id_kategori: data.id_kategori,
            id_asrama: data.id_asrama,
            id_kamar: data.id_kamar,
            idGambar: data.idGambar,
            token
        })
        if (edited.status == 400) return res.render('pages/asset/edit', { 
            session: req.session.user,
            errors: edited.message,
            id: data.id,
            nama_asset: data.nama_asset,
            id_kategori: data.id_kategori,
            id_asrama: data.id_asrama,
            id_kamar: data.id_kamar,
            asset,
            asrama,
            kamar,
            kategoriAsset,
            page_name: 'asset'
        })
        if (edited.status == 200) { 
            res.render('pages/asset/edit', { 
                session: req.session.user,
                success: edited.message,
                errors: '',
                nama_asset: data.nama_asset,
                id_kategori: data.id_kategori,
                id_asrama: data.id_asrama,
                id_kamar: data.id_kamar,
                asset,
                asrama,
                kamar,
                kategoriAsset,
                page_name: 'asset'
            })
            const logs = await Logs.create({ 
                ipaddress: req.connection.remoteAddress, 
                id_users: `${req.session.user.data.id}`,
                browser: data.browser, 
                browser_version: data.browser_version,
                os: data.os,
                logdetail: 'Edit Data Asset',
                hostname: os.hostname(),
                token 
            })
        }
    } catch (error) {
        throw error
    }
}

async function deleteAsset (req, res, next) {
    let log = debug('esima:asset:deleteAsset')
    let data = req.body
    log('[esima][asset] deleteAsset', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const id = data.id
        const deleted = await Asset.deleteAsset(id, token)
        log('deleted', deleted)

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
        log('logs', logs)
    } catch (error) {
        throw error
    }
}

module.exports = {
    indexPage,
    addPage,
    editPage,
    getAll,
    addAsset,
    editAsset,
    deleteAsset
}