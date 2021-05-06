'use strict'

const debug = require('debug')
const { post, get, patch } = require('../libs/request')
const service = require('../config/service')
const axios = require('axios')

exports.findAll = (data, token) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:asset:findAll')
        log('[esima][asset] findAll', data, token)
        try {
            const url = service.api + "v1/asset/getAll"
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

exports.findAsset = (id, token) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:asset:findAsset')
        log('[esima][asset] findAsset', id, token)
        try {
            const url = service.api + "v1/asset/getById/" + id
            const headers = { Authorization : 'Bearer ' + token }
            const body = {} 
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

exports.findAssetByIdKamar = (id, token) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:asset:findAssetByIdKamar')
        log('[esima][asset] findAsset', id, token)
        try {
            const url = service.api + "v1/asset/getByKamar/" + id
            const body = {} 
            const headers = { Authorization: 'Bearer ' + token }
            log('url, body, headers', url, body, headers)
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

exports.create = ({ nama_asset, id_kategori, id_asrama, id_kamar, files, token }) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:asset:create')
        log('[esima][asset] create', { nama_asset, id_kategori, id_asrama, id_kamar, files, token })
        try {
            const url = service.api + "v1/asset/add"
            const headers = { Authorization : 'Bearer ' + token }
            const body = { nama_asset, id_kategori, id_asrama, id_kamar, files } 
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

exports.editById = ({ id, nama_asset, id_kategori, id_asrama, id_kamar, files, idGambar, token }) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:asset:create')
        log('[esima][asset] create', { id, nama_asset, id_kategori, id_asrama, id_kamar, files, idGambar, token })
        try {
            const url = service.api + "v1/asset/edit/" + id
            const headers = { Authorization : 'Bearer ' + token }
            const body = { nama_asset, id_kategori, id_asrama, id_kamar, files, idGambar } 
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

exports.deleteAsset = (id, token) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:asset:deleteAsset')
        log('[esima][asset] deleteAsset', id, token)
        try {
            const url = service.api + 'esima/asset/' + id
            const headers = { Authorization : 'Bearer ' + token }
            const body = { id }
            log('url, body', url, body)
            let response = await axios.delete(
                url,
                { headers },
                body
            )
            log('response', response)
            resolve(response.body)
        } catch (error) {
            throw error
        }
    })