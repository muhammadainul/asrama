'use strict'

const debug = require('debug')
const _ = require('lodash')
const Kamar = require('../queries/kamar')
const Asrama = require('../queries/asrama')
const Tamu = require('../queries/tamu')
const Asset = require('../queries/asset')
const Logs = require('../queries/logs')
const Diklat = require('../queries/diklat')
const Users = require('../queries/users')
const os = require('os')
const { update } = require('lodash')

async function indexPage (req, res) {
    let log = debug('esima:profile:indexPage')
    log('[esima][profile] indexPage')
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken
        let success = ''

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

        const diklat = await Diklat.findDiklat(token)
        log('diklat', diklat)
        const profile = await Users.getProfile(token)
        log('profile', profile)
        const profileAdmin = await Users.getProfileAdmin(token)
        log('profileAdmin', profileAdmin)

        if (session.data.kewenangan_id == 1) {
            res.render('../views/pages/profile/', { 
                session: req.session.user,
                diklat,
                profileAdmin,
                page_name: 'profile',
                errors,
                success
            })
        } else {
            res.render('../views/pages/peserta/profile', { 
                session: req.session.user,
                diklat,
                profile,
                page_name: 'profile',
                errors,
                success
            })
        }

    } catch (error) {
        throw error
    }
}

async function changePassword (req, res) {
    let log = debug('esima:profile:changePassword')
    let data = req.body
    log('[esima][profie] changePassword', data)
    try {
        const success = ''
        const errors = ''
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const diklat = await Diklat.findDiklat(token)
        log('diklat', diklat)
        const profile = await Users.getProfile(token)
        log('profile', profile)
        const profileAdmin = await Users.getProfileAdmin(token)
        log('profileAdmin', profileAdmin)

        const updated = await Users.updateByNip({
            oldpassword: `${data.oldpassword}`,
            password: `${data.password}`,
            repassword: `${data.repassword}`,
            nip: session.data.nip,
            token
        })
        if (session.data.kewenangan_id == 1) {
            if (updated.statusCode == 400) return res.render('../views/pages/profile/', {
                errors: updated.message,
                success,
                page_name: 'profile',
                session,
                oldpassword: data.oldpassword,
                password: data.password,
                repassword: data.repassword,
                profileAdmin
            })
            else if (updated.statusCode == 200) return res.render('../views/pages/profile/', {
                success: updated.message,
                session,
                page_name: 'profile',
                errors,
                profileAdmin
            })
        } else {
            if (updated.statusCode == 400) return res.render('../views/pages/peserta/profile', {
                errors: updated.message,
                success,
                session,
                page_name: 'profile',
                oldpassword: data.oldpassword,
                password: data.password,
                repassword: data.repassword,
                profile,
                diklat
            })
            else if (updated.statusCode == 200) return res.render('../views/pages/peserta/profile', {
                success: updated.message,
                errors,
                session,
                page_name: 'profile',
                profile,
                diklat
            })
        }

        const logs = await Logs.create({ 
            ipaddress: req.connection.remoteAddress, 
            id_users: `${session.data.id}`,
            browser: data.browser, 
            browser_version: data.browser_version,
            os: data.os,
            logdetail: 'Ubah Password',
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
    changePassword
}