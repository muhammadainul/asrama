'use strict'

const debug = require('debug')
const { post, get, put } = require('../libs/request')
const service = require('../config/service')
const axios = require('axios')

exports.findDiklat = (token) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:diklat:findDiklat')
        log('[esima][diklat] findDiklat', token)
        try {
            const url = service.api + "esima/diklat"
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
