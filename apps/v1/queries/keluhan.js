'use strict'

const debug = require('debug')
const { post, get, put } = require('../libs/request')
const service = require('../config/service')
const axios = require('axios')
const { reject, head } = require('lodash')

exports.findAll = (data, token) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:keluhan:findAll')
        log('[esima][keluhan] findAll', { data, token })
        try {
            const url = service.api + "esima/keluhan"
            const body = data 
            const headers = { Authorization: 'Bearer ' + token }
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

exports.create = ({ nama, keluhan, id_kamar, id_asrama, token }) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:keluhan:findAll')
        log('[esima][keluhan] findAll', { nama, keluhan, id_kamar, id_asrama, token })
        try {
            const url = service.api + "esima/keluhan"
            const body = { nama, keluhan, id_kamar, id_asrama } 
            const headers = { Authorization: 'Bearer ' + token }
            log('url, body', url, body)
            let response = await post(
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

exports.updateStatus = (id, token) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:keluhan:updateStatus')
        log('[esima][keluhan] updateStatus', { id, token })
        try {
            const url = service.api + "esima/keluhan/proses/" + id
            const body = {}
            const headers = { Authorization: 'Bearer ' + token }
            log('url, headers, body', url, headers, body)
            let response = await put(
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
