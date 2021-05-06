'use strict'

const debug = require('debug')
const { post, get, put } = require('../libs/request')
const service = require('../config/service')
const axios = require('axios')
const { isEmpty } = require('lodash')

exports.getLantai = (token) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:lantai:getLantai')
        log('[esima][lantai] getLantai', token)
        try {
            const url = service.api + "v1/asrama/lantai"
            let body = {}
            let headers = { Authorization: 'Bearer ' + token }
            log('url, headers, body', url, headers, body)
            let response = await get(
                url, 
                headers,
                body
            )
            log('response', response.data)
            isEmpty(response) ? resolve(response) : resolve(response.data)
        } catch (error) {
            throw error
        }
    })