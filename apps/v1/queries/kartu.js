const debug = require('debug')
const _ = require('lodash')
const service = require('../config/service')
const { post, get, put, patch } = require('../libs/request')
const log = debug('esima:queries:')

exports.getKartu = (token) => 
    new Promise(async(resolve, reject) => {
        log('getKartu', token)
        try {
            const url = service.api + 'v1/kartu/getKartu'
            const headers = { Authorization: 'Bearer ' + token }
            const body = {}
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

exports.findAll = (data, token) =>
    new Promise(async(resolve, reject) => {
        log('findAll', { data, token })
        try {
            const url = service.api + 'v1/asrama/kartu'
            const headers = { Authorization: 'Bearer ' + token }
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

exports.findKartuData = (id, token) => 
    new Promise(async(resolve, reject) => {
        log('getById', id, token)
        try {
            const url = service.api + 'v1/kartu/getById/' + id
            const headers = { Authorization: 'Bearer ' + token }
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

exports.create = (formData, token) =>
    new Promise(async(resolve, reject) => {
        log('create', { formData, token })
        try {
            const url = service.api + 'v1/kartu/add'
            const headers = { Authorization: 'Bearer ' + token }
            const body = formData
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

exports.update = (formData, token) =>
    new Promise(async(resolve, reject) => {
        log('update', { formData, token })
        try {
            const url = service.api + 'v1/kartu/edit/' + formData.id
            const headers = { Authorization: 'Bearer ' + token }
            const body = formData
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