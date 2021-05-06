'use strict'

const debug = require('debug')
const _ = require('lodash')
const KategoriAsset = require('../queries/kategoriAsset')
const Logs = require('../queries/logs')
const os = require('os')

async function indexPage (req, res) {
    let log = debug('esima:kategoriAsset:indexPage')
    log('[esima][kategoriAsset] indexPage')
    try {
        let session = req.session.user
        if (req.session.user) {
            session
        } else {
            session = null
        }
        res.render('pages/kategori_asset/index', { 
            session: req.session.user,
            page_name: 'kategori_asset'
        })
    } catch (error) {
        throw error
    }
}

async function addPage (req, res) {
    let log = debug('esima:kategoriAsset:tambahPage')
    log('[esima][kategoriAsset] tambahPage')
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

        res.render('pages/kategori_asset/tambah', { 
            session: req.session.user,
            errors: errors,
            success,
            page_name: 'kategori_asset'
        })
    } catch (error) {
        throw error
    }
}

async function editPage (req, res) {
    let log = debug('esima:kategoriAsset:editPage')
    let param = req.params
    log('[esima][kategoriAsset] ediPage', param)
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

        let kategoriAsset = await KategoriAsset.findKategoriAsset(param.id, token)
        res.render('pages/kategori_asset/edit', { session: req.session.user, kategoriAsset, success, errors, page_name: 'kategori_asset' })
    } catch (error) {
        throw error
    }
}

async function getAll (req, res, next) {
    let log = debug('esima:kategoriAsset:getAll')
    let data = req.body
    log('[esima][kategoriAsset] getAll', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        data.searchOrder = ""
        if (data.order[0].dir == "desc") {
            data.searchOrder = "-" + data.searchOrder;
        }
        const result = await KategoriAsset.findAll(data, token)
        log('result')

        return res.send(result).data
    } catch (error) {
        throw error
    }
}

async function addKategoriAsset (req, res, next) {
    let log = debug('esima:kategoriAsset:addKategoriAsset')
    let data = req.body
    log('[esima][kategoriAsset] addKategoriAsset', { data })
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const created = await KategoriAsset.create({ 
            nama_kategori: data.nama_kategori,
            deskripsi: data.deskripsi,
            token
        })
        if (created.status == 400) res.render('pages/kategori_asset/tambah', { 
            session: req.session.user,
            errors: created.message,
            nama_kategori: data.nama_kategori,
            deskripsi: data.deskripsi,
            page_name: 'kategori_asset'
        })
        if (created.status == 200) {
            res.render('pages/kategori_asset/tambah', { 
                session: req.session.user,
                errors: '',
                success: created.message,
                nama_kategori: data.nama_kategori,
                deskripsi: data.deskripsi,
                page_name: 'kategori_asset'
            })
            const logs = await Logs.create({ 
                ipaddress: req.connection.remoteAddress,
                id_users: `${req.session.user.data.id}`,
                browser: data.browser, 
                browser_version: data.browser_version,
                os: data.os,
                logdetail: 'Tambah Data Kategori Asset',
                hostname: os.hostname(),
                token
            })
        }
    } catch (error) {
        throw error
    }
}

async function editKategoriAsset (req, res) {
    let log = debug('esima:kategoriAsset:editKategoriAsset')
    let data = req.body
    log('[esima][kategoriAsset] editKategoriAsset', { data })
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken
        let kategoriAsset = await KategoriAsset.findKategoriAsset(data.id, token)

        const created = await KategoriAsset.editById({ 
            id: data.id,
            nama_kategori: data.nama_kategori,
            deskripsi: data.deskripsi,
            token
        })
        if (created.status == 400) res.render('pages/kategori_asset/edit', { 
            session: req.session.user,
            errors: created.message,
            nama_kategori: data.nama_kategori,
            deskripsi: data.deskripsi,
            kategoriAsset,
            page_name: 'kategori_asset'
        })
        if (created.status == 200) {
            res.render('pages/kategori_asset/edit', { 
                session: req.session.user,
                errors: '',
                success: created.message,
                nama_kategori: data.nama_kategori,
                kategoriAsset,
                deskripsi: data.deskripsi,
                page_name: 'kategori_asset'
            })
            const logs = await Logs.create({ 
                ipaddress: req.connection.remoteAddress,
                id_users: `${req.session.user.data.id}`,
                browser: data.browser, 
                browser_version: data.browser_version,
                os: data.os,
                logdetail: 'Edit Data Kategori Asset',
                hostname: os.hostname(),
                token
            })
        }
    } catch (error) {
        throw error
    }
}

async function deleteKategoriAsset (req, res) {
    let log = debug('esima:kategoriAsset:deleteKategoriAsset')
    let data = req.body
    log('[esima][kategoriAsset] deleteKategoriAsset', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const id = data.id
        const deleted = await KategoriAsset.deleteKategoriAsset(id, token)
        log('deleted', deleted)

        const logs = await Logs.create({ 
            ipaddress: req.connection.remoteAddress, 
            id_users: `${req.session.user.data.id}`,
            browser: data.browser, 
            browser_version: data.browser_version,
            os: data.os,
            logdetail: 'Hapus Data Kategori Asset',
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
    addKategoriAsset,
    editKategoriAsset,
    deleteKategoriAsset
}