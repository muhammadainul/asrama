'use strict'

const debug = require('debug')
const { post, get, patch } = require('../libs/request')
const service = require('../config/service')
const axios = require('axios')

exports.findAll = (data, token) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:reservasi:findAll')
        log('[esima][reservasi] findAll', { data, token })
        try {
            const url = service.api + "v1/reservasi/getAll"
            const body = data 
            const headers = { Authorization: 'Bearer ' + token}
            log('url, body', url, body)
            let response = await get(
                url, 
                headers,
                body
            )
            log('response', response.body)
            resolve(response.body)
        } catch (error) {
            throw error
        }
    })

exports.findAsset = (id) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:asset:findAsset')
        log('[esima][asset] findAsset', id)
        try {
            const url = service.api + "esima/asset/" + id
            const body = {} 
            log('url, body', url, body)
            let response = await get(
                url, 
                { 'User-Agent': 'request' },
                body
            )
            log('response', response.data)
            resolve(response.data)
        } catch (error) {
            throw error
        }
    })

exports.findReservasiData = (id, token) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:reservasi:findReservasiData')
        log('[esima][reservasi] findReservasiData', id, token)
        try {
            const url = service.api + "v1/reservasi/getById/" + id
            const headers = { Authorization : 'Bearer ' + token }
            const body = {} 
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

exports.findByIdTamu = (token, id_tamu) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:reservasi:findByIdTamu')
        log('[esima][reservasi] findByIdTamu', { token, id_tamu })
        try {
            const url = service.api + "esima/reservasi/get/" + id_tamu
            const body = {} 
            const headers = { Authorization: 'Bearer ' + token }
            log('url, body', url, body)
            let response = await get(
                url, 
                headers,
                body
            )
            log('response', response.data)
            resolve(response.data)
        } catch (error) {
            throw error
        }
    })

exports.create = ({ id_penghuni, nama_lengkap, nik, nip, jenis_kelamin, alamat, no_telepon, email, id_asrama, id_kamar, tgl_cekin, token }) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:reservasi:create')
        log('[esima][reservasi] create', { id_penghuni, nama_lengkap, nik, nip, jenis_kelamin, alamat, no_telepon, email, id_asrama, id_kamar, tgl_cekin, token })
        try {
            const url = service.api + "v1/reservasi/add"
            const headers = { Authorization: 'Bearer ' + token }
            const body = { id_penghuni, nama_lengkap, nik, nip, jenis_kelamin, alamat, no_telepon, email, id_asrama, id_kamar, tgl_cekin } 
            log('url, body', url, headers, body)
            let response = await post(
                url, 
                headers,
                body
            )
            log('response', response.body)
            resolve(response)
        } catch (error) {
            throw error
        } 
    })

exports.editDataReservasi = ({ id, nama_lengkap, nik, nip, jenis_kelamin, alamat, no_telepon, email, id_asrama, id_kamar, tgl_cekin, idUsers, id_penghuni, idKamar, token }) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:reservasi:editDataReservasi')
        log('[esima][reservasi] editDataReservasi', { id, nama_lengkap, nik, nip, jenis_kelamin, alamat, no_telepon, email, id_asrama, id_kamar, tgl_cekin, idUsers, id_penghuni, idKamar, token })
        try {
            const url = service.api + "v1/reservasi/edit/" + id
            const headers = { Authorization: 'Bearer ' + token }
            const body = { nama_lengkap, nik, nip, jenis_kelamin, alamat, no_telepon, email, id_asrama, id_kamar, tgl_cekin, idUsers, idKamar, id_penghuni} 
            log('url, body', url, headers, body)
            let response = await patch(
                url, 
                headers,
                body
            )
            log('response', response.body)
            resolve(response)
        } catch (error) {
            throw error
        } 
    })

exports.checkOut = (id, id_kamar, id_tamu, token) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:reservasi:checkOut')
        log('[esima][reservasi] checkOut', id, id_kamar, id_tamu, token)
        try {
            const url = service.api + "v1/reservasi/checkout"
            const headers = { Authorization : 'Bearer ' + token }
            const body = { id, id_kamar, id_tamu } 
            log('url, body', url, body)
            let response = await post(
                url, 
                headers,
                body
            )
            log('response', response.data)
            resolve(response.data)
        } catch (error) {
            throw error
        }
    })

exports.deleteReservasi = (id, token) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:reservasi:deleteReservasi')
        log('[esima][reservasi] deleteReservasi', id, token)
        try {
            const url = service.api + 'esima/reservasi/' + id
            const headers = { Authorization: 'Bearer ' + token }
            const body = { id }
            log('url, headers, body', url, headers, body)
            let response = await axios.delete(url, { 
                headers : { Authorization: 'Bearer ' + token } 
                },
                body)
            log('response', response.body)
            resolve(response)
        } catch (error) {
            throw error
        }
    })