'use strict'

const debug = require('debug')
const { post, get } = require('../libs/request')
const service = require('../config/service')
const { head } = require('lodash')

exports.findByNip = (nip, password) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:user:findByNip')
        log('[esima][user] findByNip', { nip, password })
        try {
            const url = service.api + "v1/pengguna/login"
            log(url)
            const body = { nip, password }
            log('url, body', url, body)
            let response = await post(
                url, 
                { 'User-Agent': 'request' },
                body
            )
            log('response', response)
            resolve(response)
        } catch (error) {
            throw error
        }
    })

exports.getProfile = (token) =>
    new Promise(async(resolve, reject) => {
        let log = debug('esima:queries:user:getProfile')
        log('[esima][user] getProfile', token)
        try {
            const url = service.api + "v1/asrama/pengguna"
            const body = {}
            const headers = { Authorization: 'Bearer ' + token }
            log('url, body', url, body)
            let response = await get(
                url, 
                headers,
                body
            )
            log('response', response)
            resolve(response.data)
        } catch (error) {
            throw error
        }
    })

exports.getProfileAdmin = (token) =>
    new Promise(async(resolve, reject) => {
        let log = debug('esima:queries:user:getProfileAdmin')
        log('[esima][user] getProfile', token)
        try {
            const url = service.api + "v1/asrama/profile"
            const body = {}
            const headers = { Authorization: 'Bearer ' + token }
            log('url, body', url, body)
            let response = await get(
                url, 
                headers,
                body
            )
            log('response', response)
            resolve(response.data)
        } catch (error) {
            throw error
        }
    })

exports.create = ({ nama_lengkap, email, nik, nip, no_telepon, alamat, password, repassword, jenis_kelamin, username, id_master_diklat }) =>
    new Promise(async(resolve, reject) => {
        let log = debug('esima:queries:user:create')
        log('[esima][user] create', { nama_lengkap, email, nik, nip, no_telepon, alamat, password, repassword, jenis_kelamin, username, id_master_diklat })
        try {
            const url = service.api + "asrama/registrasi"
            const body = { nama_lengkap, email, nik, nip, no_telepon, alamat, password, repassword, jenis_kelamin, username, id_master_diklat }
            log('url, body', url, body)
            let response = await post(
                url,
                { 'User-Agent': 'request' },
                body
            )
            log('response', response)
            resolve(response)
        } catch (error) {
            throw error
        }
    })

exports.updateByNip = ({ oldpassword, password, repassword, nip, token }) =>
    new Promise(async(resolve, reject) => {
        let log = debug('esima:queries:users:updateByNip')
        log('[esima][user] updateBynip', { oldpassword, password, repassword, nip, token })
        try {
            const url = service.api + "asrama/changePassword"
            const headers = { Authorization : 'Bearer ' + token }
            const body = { oldpassword, password, repassword, nip }
            log('url, headers, body', url, headers, body)
            let response = await post(
                url,
                headers,
                body
            )
            log('response', response)
            resolve(response)
        } catch (error) {
            throw error
        }
    })

exports.sendToken = ({ token }) =>
    new Promise(async(resolve, reject) => {
        let log = debug('esima:queries:users:updateByNip')
        log('[esima][user] updateBynip', { token })
        try {
            const url = service.api + "asrama/confirmation/token/" + token
            const body = {}
            log('url, body', url, body)
            let response = await get(
                url,
                { 'User-Agent' : 'request' },
                body
            )
            log('response', response)
            resolve(response)
        } catch (error) {
            throw error
        }
    })