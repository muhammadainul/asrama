'use strict'

const debug = require('debug')
const { post, get, put } = require('../libs/request')
const service = require('../config/service')
const axios = require('axios')

exports.findAll = (data, token) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:tamu:findAll')
        log('[esima][tamu] findAll', data, token)
        try {
            const url = service.api + "esima/tamu"
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

exports.findDataTamu = (id, token) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:tamu:findDataTamu')
        log('[esima][tamu] findDataTamu', { id, token })
        try {
            const url = service.api + "esima/tamu/get/" + id
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
        } catch (error){
            throw error
        }
    })