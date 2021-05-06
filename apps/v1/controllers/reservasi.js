'use strict'

const debug = require('debug')
const _ = require('lodash')
const Kamar = require('../queries/kamar')
const Asrama = require('../queries/asrama')
const Reservasi = require('../queries/reservasi')
const Tamu = require('../queries/tamu')
const Logs = require('../queries/logs')
const Diklat = require('../queries/diklat')
const Users = require('../queries/users')
const QRCode = require('../queries/qrcode')
const qr = require('qr-image')
const fs = require('fs')
const os = require('os')
const moment = require('moment')
const { isEmpty } = require('lodash')
const log = debug('esima:reservasi:')

async function indexPage (req, res) {
    let data = req.body
    log('[esima][reservasi] indexPage')
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        if (req.session.user) {
            session
        } else {
            session = null
        }

        if (session.data.kewenangan_id == 1) {
            const asrama = await Asrama.getAsrama(token)
            log('asrama', asrama)

            res.render('../views/pages/reservasi/', { 
                session: req.session.user,
                page_name: 'reservasi',
                asrama
            })
        } else {
            const diklat = await Diklat.findDiklat(token)
            const profile = await Users.getProfile(token)
            const asrama = await Asrama.getAsrama(token)
            const kamar = await Kamar.getKamar(token)
            const tgl_reservasi = moment().format('YYYY-MM-DD HH:mm:ss')

            const reservasi = await Reservasi.findByIdTamu(token, profile.id)
            log('reservasi', reservasi)
            
            if (!isEmpty(reservasi)) { var tgl_cekin = moment(reservasi.tgl_cekin).format('YYYY-MM-DD') }
            else { var tgl_cekin = '' }

            res.render('../views/pages/peserta/reservasi', { 
                session: req.session.user,
                diklat,
                profile,
                asrama,
                kamar,
                tgl_reservasi,
                reservasi,
                tgl_cekin,
                page_name: 'reservasi'
            })
        }
    } catch (error) {
        throw error
    }
}

async function addPage (req, res) {
    let data = req.body
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

        const tgl_reservasi = moment().format('YYYY-MM-DD HH:mm:ss')
        const asrama = await Asrama.getAsrama(token)
        const kamar = await Kamar.getKamar(token)

        res.render('../views/pages/reservasi/tambah', { 
            session: req.session.user,
            success,
            errors: errors,
            tgl_reservasi,
            asrama,
            kamar,
            page_name: 'reservasi'
        })
    } catch (error) {
        throw error
    }
}

async function editPage (req, res) {
    let param = req.params
    log('editPage', param)
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
        const kamar = await Kamar.getKamar(token)
        const reservasi = await Reservasi.findReservasiData(param.id, token)

        let tgl_reservasi = new Date(reservasi.tgl_reservasi).toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false })
        let date = new Date(reservasi.tgl_cekin).toLocaleString('en-US')
        let tgl_cekin = date.split(', ')[0]
        if (!isEmpty(reservasi.tgl_cekout)) {
            let cekout = new Date(reservasi.tgl_cekout).toLocaleString('en-US')
            var tgl_cekout = cekout.split(', ')[0]
        }

        res.render('pages/reservasi/edit', { 
            session: req.session.user, 
            reservasi,
            success,
            asrama,
            kamar,
            tgl_reservasi,
            tgl_cekin,
            tgl_cekout,
            errors,
            page_name: 'reservasi'
         })
    } catch (error) {
        throw error
    }
}

async function qrCodePage (req, res) {
    let param = req.params
    log('detailReservasi', param) 
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const qrcode = await QRCode.getQRCode(param.id, token)
        res.render('pages/reservasi/qrcode', {
            qrcode,
            session,
            qrcode
        })
    } catch (error) {
        throw error
    }
}

async function detailReservasi (req, res, next) {
    let param = req.params
    log('detailReservasi', param)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        let errors = req.flash('error')
        if (errors.length > 0) {
            errors = errors[0]
        } else {
            errors = null
        }

        const reservasi = await Reservasi.findReservasiData(param.id, token)
        let tgl_reservasi = new Date(reservasi.tgl_reservasi).toLocaleString('en-US', { timeZone: 'UTC', hour12: false })
        let date = new Date(reservasi.tgl_cekin).toLocaleString('en-US')
        let tgl_cekin = date.split(', ')[0]
        if (!isEmpty(reservasi.tgl_cekout)) {
            let cekout = new Date(reservasi.tgl_cekout).toLocaleString('en-US')
            var tgl_cekout = cekout.split(', ')[0]
        }

        res.render('pages/reservasi/detail', { session: req.session.user, 
            reservasi,
            tgl_reservasi,
            tgl_cekin,
            tgl_cekout,
            errors,
            page_name: 'reservasi'
         })
    } catch (error) {
        throw error
    }
}

async function getAll (req, res, next) {
    let data = req.body
    log('getAll', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        data.searchOrder = ""
        if (data.order[0].dir == "desc") {
            data.searchOrder = "-" + data.searchOrder;
        }

        const result = await Reservasi.findAll(data, token)
        return res.send(result).data
    } catch (error) {
        throw error
    }
}

async function addReservasi (req, res) {
    let data = req.body
    log('addReservasi', data)
    try {
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
        const kamar = await Kamar.getKamar(token)
        const tgl_reservasi = moment().format('YYYY-MM-DD HH:mm:ss')

        if (session.data.kewenangan_id == 1) {
            const created = await Reservasi.create({ 
                token,
                id_tamu: `${data.id_tamu}`,
                nama_lengkap: `${data.nama_lengkap}`,
                nik: `${data.nik}`,
                nip: `${data.nip}`,
                jenis_kelamin: `${data.jenis_kelamin}`,
                alamat: `${data.alamat}`,
                no_telepon: `${data.no_telepon}`,
                email: `${data.email}`,
                id_asrama: `${data.id_asrama}`,
                id_kamar: `${data.id_kamar}`,
                tgl_cekin: `${data.tgl_cekin}`,
                token
            })
            
            if (created.status == 400) {
                res.render('../views/pages/reservasi/tambah', {
                    session: req.session.user,
                    errors: created.message,
                    success: '',
                    tgl_reservasi,
                    asrama,
                    kamar,
                    id_tamu: `${data.id_penghuni}`,
                    nama_lengkap: `${data.nama_lengkap}`,
                    nik: `${data.nik}`,
                    nip: `${data.nip}`,
                    jenis_kelamin: `${data.jenis_kelamin}`,
                    alamat: `${data.alamat}`,
                    no_telepon: `${data.no_telepon}`,
                    email: `${data.email}`,
                    id_asrama: `${data.id_asrama}`,
                    id_kamar: `${data.id_kamar}`,
                    tgl_cekin: `${data.tgl_cekin}`,
                    page_name: 'reservasi'
                })
            }

            if (created.status == 200) {
                res.render('../views/pages/reservasi/tambah', {
                    session: req.session.user,
                    success: created.message,
                    errors: '',
                    tgl_reservasi,
                    asrama,
                    kamar,
                    id_tamu: `${data.id_penghuni}`,
                    nama_lengkap: `${data.nama_lengkap}`,
                    nik: `${data.nik}`,
                    nip: `${data.nip}`,
                    jenis_kelamin: `${data.jenis_kelamin}`,
                    alamat: `${data.alamat}`,
                    no_telepon: `${data.no_telepon}`,
                    email: `${data.email}`,
                    id_asrama: `${data.id_asrama}`,
                    id_kamar: `${data.id_kamar}`,
                    tgl_cekin: `${data.tgl_cekin}`,
                    page_name: 'reservasi'
                })
                const logs = await Logs.create({ 
                    ipaddress: req.connection.remoteAddress, 
                    id_users: `${req.session.user.data.id}`,
                    browser: data.browser, 
                    browser_version: data.browser_version,
                    os: data.os,
                    logdetail: 'Tambah Reservasi',
                    hostname: os.hostname(),
                    token
                })
        
            }
        } else {
            const created = await Reservasi.create({ 
                token,
                id_tamu: `${data.id_tamu}`,
                nama_lengkap: `'${data.nama_lengkap}'`,
                nik: `'${data.nik}'`,
                nip: `${data.nip}`,
                jenis_kelamin: `'${data.jenis_kelamin}'`,
                alamat: `'${data.alamat}'`,
                no_telepon: `'${data.no_telepon}'`,
                id_asrama: `${data.id_asrama}`,
                id_kamar: `${data.id_kamar}`,
                tgl_cekin: `${data.tgl_cekin}`,
                token
            })
            const logs = await Logs.create({ 
                ipaddress: req.connection.remoteAddress, 
                id_users: `${req.session.user.data.id}`,
                browser: data.browser, 
                browser_version: data.browser_version,
                os: data.os,
                logdetail: 'Tambah Reservasi',
                hostname: os.hostname(),
                token
            })
    
        }
        const reservasi = await Reservasi.findByIdTamu(token, data.id_penghuni)
    } catch (error) {
        throw error
    }
}

async function editReservasi (req, res) {
    let data = req.body
    log('editReservasi', data)
    try {
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
        const kamar = await Kamar.getKamar(token)
        const tgl_reservasi = moment().format('YYYY-MM-DD HH:mm:ss')
        
        const edited = await Reservasi.editDataReservasi({ 
            token,
            id: data.id,
            idUsers: data.idUsers,
            id_penghuni: data.idTamu,
            idKamar: data.idKamar,
            nama_lengkap: data.nama_lengkap,
            nik: data.nik,
            nip: data.nip,
            jenis_kelamin: data.jenis_kelamin,
            alamat: data.alamat,
            no_telepon: data.no_telepon,
            id_asrama: data.id_asrama,
            id_kamar: data.id_kamar,
            tgl_cekin: data.tgl_cekin,
            token
        })
        if (edited.status == 400) {
            res.render('../views/pages/reservasi/tambah', {
                page_name: 'reservasi',
                session: req.session.user,
                success: '',
                errors: edited.message,
                tgl_reservasi,
                asrama,
                kamar,
                id: data.id,
                idUsers: data.idUsers,
                idTamu: data.idTamu,
                idKamar: data.idKamar,
                nama_lengkap: data.nama_lengkap,
                nik: data.nik,
                nip: data.nip,
                jenis_kelamin: data.jenis_kelamin,
                alamat: data.alamat,
                no_telepon: data.no_telepon,
                id_asrama: data.id_asrama,
                id_kamar: data.id_kamar,
                tgl_cekin: data.tgl_cekin,
            })
        }
        if (edited.status == 200) {
            res.render('../views/pages/reservasi/tambah', {
                page_name: 'reservasi',
                session: req.session.user,
                success: edited.message,
                errors: '',
                tgl_reservasi,
                asrama,
                kamar,
                id: data.id,
                idUsers: data.idUsers,
                idTamu: data.idTamu,
                idKamar: data.idKamar,
                nama_lengkap: data.nama_lengkap,
                nik: data.nik,
                nip: data.nip,
                jenis_kelamin: data.jenis_kelamin,
                alamat: data.alamat,
                no_telepon: data.no_telepon,
                id_asrama: data.id_asrama,
                id_kamar: data.id_kamar,
                tgl_cekin: data.tgl_cekin,
            })

            const logs = await Logs.create({ 
                ipaddress: req.connection.remoteAddress, 
                id_users: `${req.session.user.data.id}`,
                browser: data.browser, 
                browser_version: data.browser_version,
                os: data.os,
                logdetail: 'Edit Reservasi',
                hostname: os.hostname(),
                token
            })
        }
    } catch (error) {
        throw error
    }
} 

async function checkOut (req, res, next) {
    let data = req.body
    log('checkOut', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const id = data.id
        const id_kamar = data.id_kamar
        const id_tamu = data.id_tamu
        const deleted = await Reservasi.checkOut(id,  id_kamar, id_tamu, token)

        const logs = await Logs.create({ 
            ipaddress: req.connection.remoteAddress, 
            id_users: `${req.session.user.data.id}`,
            browser: data.browser, 
            browser_version: data.browser_version,
            os: data.os,
            logdetail: 'Check-out Reservasi',
            hostname: os.hostname(),
            token
        })
        log('logs', logs)
    } catch (error) {
        throw error
    }
}

async function deleteReservasi (req, res, next) {
    let data = req.body
    log('deleteReservasi', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken
        const id = data.id
        const deleted = await Reservasi.deleteReservasi(id, token)
        log('deleted', deleted)

        const logs = await Logs.create({ 
            ipaddress: req.connection.remoteAddress, 
            id_users: `${req.session.user.data.id}`,
            browser: data.browser, 
            browser_version: data.browser_version,
            os: data.os,
            logdetail: 'Hapus Data Reservasi',
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
    qrCodePage,
    detailReservasi,
    getAll,
    addReservasi,
    checkOut,
    editReservasi,
    deleteReservasi
}