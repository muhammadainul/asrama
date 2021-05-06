'use strict'

const debug = require('debug')
const { post, get, patch } = require('../libs/request')
const service = require('../config/service')
const axios = require('axios')

exports.findAll = (data, token) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:asrama:findAll')
        log('[esima][asrama] findAll', data, token)
        try {
            const url = service.api + "v1/asrama/asrama"
            const headers = { Authorization : 'Bearer ' + token }
            const body = data 
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

exports.getAsrama = (token) => 
new Promise(async(resolve, reject) => {
    const log = debug('esima:queries:asrama:getAsrama')
    log('[esima][asrama] getAsrama', token)
    try {
        const url = service.api + "v1/asrama/get"
        const headers = { Authorization : 'Bearer ' + token }
        let body = {}
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

exports.findAsramaData = (id, token) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:asrama:findAsramaData')
        log('[esima][asrama] findAsramaData', id, token)
        try {
            const url = service.api + 'v1/asrama/asrama/' + id
            const headers = { Authorization : 'Bearer ' + token }
            const body = { id }
            log('url, body', url, body)
            let response = await get(
                url,
                headers,
                body)
            log('response', response)
            resolve(response.data)
        } catch (error) {
            throw error
        }
    })

exports.create = ({ files, nama_asrama, jumlah_kamar, jumlah_lantai, fasilitas, token }) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:asrama:create')
        log('[esima][asrama] create', { files, nama_asrama, jumlah_kamar, jumlah_lantai, fasilitas, token })
        try {
            const url = service.api + 'v1/asrama/asrama'
            const headers = { Authorization : 'Bearer ' + token }
            const body = { files, nama_asrama, jumlah_kamar, jumlah_lantai, fasilitas }
            log('url, body', url, body)
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

exports.editById = ({ files, nama_asrama, jumlah_kamar, jumlah_lantai, fasilitas, idGambar, id, token }) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:asrama:editById')
        log('[esima][asrama] editById', { files, nama_asrama, jumlah_kamar, jumlah_lantai, fasilitas, idGambar, id, token })
        try {
            const url = service.api + 'v1/asrama/asrama/' + id
            const headers = { Authorization : 'Bearer ' + token }
            const body = { files, nama_asrama, jumlah_kamar, jumlah_lantai, fasilitas, idGambar } 
            log('url, body', url, body)
            let response = await patch(
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

exports.deleteAsrama = (id, token) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:asrama:deleteAsrama')
        log('[esima][asrama] deleteAsrama', id, token)
        try {
            const url = service.api + 'v1/asrama/asrama/' + id
            const headers = { Authorization : 'Bearer ' + token }
            const body = { id }
            log('url, body', url, body)
            let response = await axios.delete(
                url, 
                { headers },
                body
            )
            log('response', response)
            resolve(response.data)
        } catch (error) {
            throw error
        }
    })