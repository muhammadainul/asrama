const debug = require('debug')
const _ = require('lodash')
const service = require('../config/service')
const { post, get, put } = require('../libs/request')
const log = debug('esima:queries:')

exports.getQRCode = (id_reservasi, token) =>
    new Promise(async(resolve, reject) => {
        log('getQRCode', id_reservasi, token)
        try {
            const url = service.api + 'v1/qrcode/' + id_reservasi
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