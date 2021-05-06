'use strict'

const debug = require('debug')
const { post, get, put, patch } = require('../libs/request')
const service = require('../config/service')
const axios = require('axios')

exports.findAll = (data, token) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:kamar:findAll')
        log('[esima][kamar] findAll', data, token)
        try {
            const url = service.api + "v1/kamar/getAll"
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

exports.getKamar = (token) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:kamar:getKamar')
        log('[esima][kamar] getKamar', token)
        try {
            const url = service.api + "v1/kamar/getKamar"
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

exports.findLantai = (data, token) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:kamar:findLantai')
        log('[esima][kamar] findLantai', data, token)
        try {
            const url = service.api + "v1/kamar/getKamarByLantai"
            const headers = { Authorization : 'Bearer ' + token }
            let body = data 
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

exports.findKamarData = (id, token) =>
new Promise(async(resolve, reject) => {
    const log = debug('esima:queries:kamar:findKamarData')
    log('[esima][kamar] findKamarData', id, token)
    try {
        const url = service.api + 'v1/kamar/getById/' + id
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

exports.create = ({ files, nama_kamar, kapasitas, id_asrama, id_lantai, token }) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:kamar:create')
        log('[esima][kamar] create', { files, nama_kamar, kapasitas, id_asrama, id_lantai, token })
        try {
            const url = service.api + "v1/kamar/add"
            const headers = { Authorization : 'Bearer ' + token }
            const body = { files, nama_kamar, kapasitas, id_asrama, id_lantai }
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

exports.editById = ({ files, id, idGambar, nama_kamar, kapasitas, id_asrama, id_lantai, token }) =>
 new Promise(async(resolve, reject) => {
     const log = debug('esima:queries:kamar:editById')
     log('[esima][kamar] editById', { files, id, idGambar, nama_kamar, kapasitas, id_asrama, id_lantai, token })
     try {
        const url = service.api + "v1/kamar/edit/" + id
        const headers = { Authorization : 'Bearer ' + token }
        const body = { files, idGambar, nama_kamar, kapasitas, id_asrama, id_lantai } 
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

 exports.deleteKamar = (id, token) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:kamar:deleteKamar')
        log('[esima][kamar] deleteKamar', id, token)
        try {
            const url = service.api + 'v1/kamar/delete/' + id
            const headers = { Authorization : 'Bearer ' + token }
            const body = { id }
            log('url, body', url, body)
            let response = await axios.delete(
                url, 
                { headers },
                body
            )
            log('response', response)
            resolve(response)
        } catch (error) {
            throw error
        }
    })