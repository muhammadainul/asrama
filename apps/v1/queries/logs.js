'use strict'

const debug = require('debug')
const { post, get } = require('../libs/request')
const service = require('../config/service')
const { reject } = require('lodash')

exports.findAll = (data, token) => 
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:log:findAll')
        log('[esima][logs] findAll', data, token)
        try {
            const url = service.api + "v1/logs/getAll"
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

exports.create = ({ ipaddress, id_users, browser, browser_version, os, logdetail, hostname, token }) =>
    new Promise(async(resolve, reject) => {
        const log = debug('esima:queries:logs:create')
        log('[esima][logs] create', { ipaddress, id_users, browser, browser_version, os, logdetail, hostname, token })
        try {
            const url = service.api + "v1/asrama/logs"
            const headers = { Authorization : 'Bearer ' + token }
            const body = { ipaddress, id_users, browser, browser_version, os, logdetail, hostname } 
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