'use strict'

const debug = require('debug')
const { post, get, put } = require('../libs/request')
const service = require('../config/service')
const { isEmpty } = require('lodash')
const axios = require('axios')

exports.getTotalData = (token) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:dashboard:getTotalData')
        log('[esima][dashboard] getTotalData', token)
        try {
            const url = service.api + "v1/asrama/report"
            const headers = { Authorization : 'Bearer ' + token }
            const body = {} 
            log('url, body', url, body)
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