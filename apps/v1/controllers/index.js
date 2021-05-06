'use strict'

const debug = require('debug')
const { isEmpty } = require('lodash')
const passport = require('passport')
const Users = require('../queries/users')
const Diklat = require('../queries/diklat')
const Logs = require('../queries/logs')
const os = require('os')
const { session } = require('passport')
const { findDiklat } = require('../queries/diklat')

async function loginPage (req, res) {
    let log = debug('esima:index:loginPage')
    log('[esima][index] loginPage')
    try {
        let errors = req.flash('error')
        if (errors.length > 0) {
            errors = errors[0]
        } else {
            errors = null
        }
        res.render('../views/pages/login', {
            errors: errors
        })
    } catch (error) {
        throw error
    }
}

async function registerPage (req, res) {
    let log = debug('esima:index:registerPage')
    let data = req.body
    log('[esima][index] registerPage')
    try {
        let errors = req.flash('error')
        if (errors.length > 0) {
            errors = errors[0]
        } else {
            errors = null
        }

        let success = ''
        const result = await Diklat.findDiklat()
        res.render('../views/pages/registrasi', {
            errors: errors,
            success,
            nama_lengkap: data.nama_lengkap,
            email: data.email,
            nik: data.nik,
            nip: data.nip,
            no_telepon: data.no_telepon,
            alamat: data.alamat,
            password: data.password,
            repassword: data.repassword,
            jenis_kelamin: data.jenis_kelamin,
            username: data.username,
            id_master_diklat: data.id_master_diklat,
            result
        })
    } catch (error) {
        throw error
    }
}

async function login (req, res, next) {
    let log = debug('esima:index:login')
    let data = req.body
    log('[esima][index] login', data)
    try {        
        const { nip, password } = req.body

        const exists = await Users.findByNip(nip, password)
        log('exists', exists)

        if (exists.statusCode == 404) {
            return res.render('../views/pages/login', { errors: exists.message })
        } else if (exists.statusCode == 403) {
            return res.render('../views/pages/login', { errors: exists.message })
        } else if (exists.statusCode == 400) {
            return res.render('../views/pages/login', { errors: exists.message })
        } else {    
            req.session.isLoggedIn = true
            req.session.user = exists
            const logs = await Logs.create({ 
                ipaddress: req.connection.remoteAddress, 
                id_users: `${exists.data.id}`,
                browser: data.browser, 
                browser_version: data.browser_version,
                os: data.os,
                logdetail: 'LOGIN',
                hostname: os.hostname()
            }) 
            log('logs', logs)
            // Admin
            if (exists.data.kewenangan_id == 1) {
                res.redirect('/dashboard')
            } else {
                // peserta
                res.redirect('/home')
            }
        }
    } catch (error) {
        throw error
    }
}

async function register (req, res, next) {
    let log = debug('esima:index:register')
    let data = req.body
    log('[esima][index] register', data)
    try {
        const success = ''
        const result = await Diklat.findDiklat()
        const created = await Users.create({ 
            nama_lengkap: `${data.nama_lengkap}`,
            email: `${data.email}`,
            nik: `${data.nik}`,
            nip: `${data.nip}`,
            no_telepon: `${data.no_telepon}`,
            alamat: `${data.alamat}`,
            password: `${data.password}`,
            repassword: `${data.repassword}`,
            jenis_kelamin: `${data.jenis_kelamin}`,
            id_master_diklat: `${data.id_master_diklat}`,
            username: `${data.username}`
        })
        if (created.statusCode == 400) return res.render('../views/pages/registrasi', {
            errors: created.message,
            success,
            nama_lengkap: data.nama_lengkap,
            email: data.email,
            nik: data.nik,
            nip: data.nip,
            no_telepon: data.no_telepon,
            alamat: data.alamat,
            password: data.password,
            repassword: data.repassword,
            jenis_kelamin: data.jenis_kelamin,
            username: data.username,
            id_master_diklat: data.id_master_diklat,
            result
        })

        if (created.statusCode == 200) return res.render('../views/pages/registrasi', {
            errors: '',
            success: created.message,
            nama_lengkap: data.nama_lengkap,
            email: data.email,
            nik: data.nik,
            nip: data.nip,
            no_telepon: data.no_telepon,
            alamat: data.alamat,
            password: data.password,
            repassword: data.repassword,
            jenis_kelamin: data.jenis_kelamin,
            username: data.username,
            id_master_diklat: data.id_master_diklat,
            result
        })
    } catch (error) {
        throw error
    }
}

async function tokenConfirmPage (req, res) {
    let log = debug('esima:index:tokenConfirmPage')
    let param = req.params
    log('[esima][index] tokenConfirmPage', { param })
    try {
        let errors = req.flash('error')
        if (errors.length > 0) {
            errors = errors[0]
        } else {
            errors = null
        }

        const confirmVerification = await Users.sendToken({ token: param.token })
        log(confirmVerification)

        res.render('../views/pages/verified')
    } catch (error) {
        throw error
    }
}

async function logout (req, res) {
    let log = debug('esima:index:logout')
    let data = req.body
    log('[esima][index] logout', data)
    try {
        req.session.destroy(function (){
            log('logout!')
            res.redirect('/')
        })
    } catch (error) {
        throw error
    }
}

module.exports = {
    loginPage,
    registerPage,
    login,
    register,
    tokenConfirmPage,
    logout
}