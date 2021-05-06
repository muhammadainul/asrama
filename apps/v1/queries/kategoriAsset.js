'use strict'

const debug = require('debug')
const { post, get, patch } = require('../libs/request')
const service = require('../config/service')
const axios = require('axios')
const { reject } = require('lodash')

exports.findAll = (data, token) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:kategoriAsset:findAll')
        log('[esima][kategoriAsset] findAll', data, token)
        try {
            const url = service.api + "v1/kategoriAsset/getAll"
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

exports.getKategoriAsset = (token) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:kategoriAsset:getKategoriAsset')
        log('[esima][kategoriAsset] getKategoriAsset', token)
        try {
            const url = service.api + "v1/kategoriAsset/getKategori"
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

exports.findKategoriAsset = (id, token) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:kategoriAsset:findKategoriAsset')
        log('[esima][kategoriAsset] findKategoriAsset', id, token)
        try {
            const url = service.api + "v1/kategoriAsset/getById/" + id
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

exports.create = ({ nama_kategori, deskripsi, token }) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:kategoriAsset:create')
        log('[esima][kategoriAsset] create', { nama_kategori, deskripsi, token })
        try {
            const url = service.api + "v1/kategoriAsset/add"
            const headers = { Authorization : 'Bearer ' + token }
            const body = { nama_kategori, deskripsi } 
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

exports.editById = ({ id, nama_kategori, deskripsi, token }) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:kategoriAsset:editById')
        log('[esima][kategoriAsset] editById', { id, nama_kategori, deskripsi, token })
        try {
            const url = service.api + "v1/kategoriAsset/edit/" + id
            const headers = { Authorization : 'Bearer ' + token }
            const body = { nama_kategori, deskripsi } 
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

exports.deleteKategoriAsset = (id, token) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:kategoriAsset:deleteKategoriAsset')
        log('[esima][kategoriAsset] deleteKategoriAsset', id, token)
        try {
            const url = service.api + 'v1/kategoriAsset/delete/' + id
            const headers = { Authorization : 'Bearer ' + token }
            const body = { id }
            log('url, body', url, body)
            let response = await axios.delete(url, { headers }, body)
            log('response', response)
            resolve(response.body)
        } catch (error) {
            throw error
        }
    })