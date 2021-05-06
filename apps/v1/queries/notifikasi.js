'use strict'

const debug = require('debug')
const { post, get, put } = require('../libs/request')
const service = require('../config/service')
const axios = require('axios')

exports.getData = (token) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:tamu:getData')
        log('[esima][tamu] getData', token)
        try {
            const url = service.api + "esima/notifikasi"
            const body = {}
            const headers = { Authorization : 'Bearer ' + token }
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