const debug = require('debug')
const _ = require('lodash')
const Kamar = require('../queries/kamar')
const Asrama = require('../queries/asrama')
const Kartu = require('../queries/kartu')
const Asset = require('../queries/asset')
const Logs = require('../queries/logs')
const log = debug('esima:kartu:')
const os = require('os')

async function indexPage (req, res) {
    log('indexPage')
    try {
        let token = req.session.user.session.accessToken
        let session = req.session.user
        if (req.session.user) {
            session
        } else {
            session = null
        }

        const asrama = await Asrama.getAsrama(token)

        // const kartu = await Kartu.getKartu(token)
        // log('kartu', kartu)

        res.render('../views/pages/kartu/', { 
            session: req.session.user,
            page_name: 'kartu',
            asrama
        })
    } catch (error) {
        throw error
    }
}

async function addPage (req, res) {
    log('addPage')
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

        const kamar = await Kamar.getKamar(token)
        log('kamar', kamar)

        res.render('../views/pages/kartu/tambah', { 
            session: req.session.user,
            errors: errors,
            kamar,
            success,
            page_name: 'kartu'
        })
    } catch (error) {
        throw error
    }
}

async function editPage (req, res) {
    let data = req.body
    let param = req.params
    log('editPage', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken
        const success = ''

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

        const result = await Kartu.findKartuData(param.id, token)
        const kamar = await Kamar.getKamar(token)
        res.render('../views/pages/kartu/edit', {
            session: req.session.user,
            errors: errors,
            kamar,
            success,
            page_name: 'kartu',
            result
        })
    } catch (error) {
        throw error
    }
}

async function getAll (req, res) {
    let data = req.body
    log('getAll', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        data.searchOrder = ''
        const result = await Kartu.findAll(data, token)
        return res.send(result).data
    } catch (error) {
        throw error
    }
}

async function addKartu (req, res) {
    let data = req.body
    log('editKartu', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken
        const kamar = await Kamar.getKamar(token)

        let formData = {
            rfid: data.rfid,
            id_kamar: data.id_kamar
        }
        const created = await Kartu.create(formData, token)
        if (created.status == 400) return res.render('../views/pages/kartu/tambah', {
            errors: created.message,
            success: '',
            rfid: data.rfid,
            id_kamar: data.rfid,
            page_name: 'kartu',
            session,
            kamar
        })

        if (created.status == 200) {
            res.render('../views/pages/kartu/tambah', {
                success: created.message,
                errors: '',
                page_name: 'kartu',
                session,
                kamar
            })
            const logs = await Logs.create({ 
                ipaddress: req.connection.remoteAddress, 
                id_users: `${req.session.user.data.id}`,
                browser: data.browser, 
                browser_version: data.browser_version,
                os: data.os,
                logdetail: 'Tambah Data Kartu',
                hostname: os.hostname(),
                token
            })
    
        }
    } catch (error) {
        throw error
    }
}

async function editKartu (req, res) {
    let data = req.body
    log('editKartu', { data })
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken
        const kamar = await Kamar.getKamar(token)

        let formData = {
            id: data.id,
            rfid: `${data.rfid}`,
            newRfid: data.newRfid,
            id_kamar: data.id_kamar
        }

        const result = await Kartu.findKartuData(formData.id, token)
        const updated = await Kartu.update(formData, token)
        if (updated.status == 400) return res.render('../views/pages/kartu/edit', {
            errors: updated.message,
            success: '',
            rfid: data.rfid,
            newRfid: data.newRfid,
            id_kamar: data.rfid,
            page_name: 'kartu',
            result,
            session,
            kamar
        })

        if (updated.status == 200) { 
            res.render('../views/pages/kartu/edit', { 
                success: updated.message, 
                errors: '', 
                result, 
                kamar, 
                session, 
                page_name: 'kartu' 
            })
            const logs = await Logs.create({ 
                ipaddress: req.connection.remoteAddress, 
                id_users: `${req.session.user.data.id}`,
                browser: data.browser, 
                browser_version: data.browser_version,
                os: data.os,
                logdetail: 'Edit Data Kartu',
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
    getAll,
    addKartu,
    editKartu
}