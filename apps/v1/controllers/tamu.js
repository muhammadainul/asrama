'use strict'

const debug = require('debug')
const _ = require('lodash')
const Tamu = require('../queries/tamu')

async function indexPage (req, res) {
    let log = debug('esima:penghuni:indexPage')
    log('[esima][penghuni] indexPage')
    try {
        let session = req.session.user
        if (req.session.user) {
            session
        } else {
            session = null
        }

        res.render('../views/pages/tamu', { 
            session: req.session.user,
            page_name: 'penghuni'
        })
    } catch (error) {
        throw error
    }
}

async function getAll (req, res) {
    let log = debug('esima:tamu:getAll')
    let data = req.body
    log('[esima][tamu] getAll', data)
    try {
        let session = req.session.user
        let token = req.session.user.session.accessToken

        const result = await Tamu.findAll(data, token)
        log('result', result)

        return res.send(result).data
    } catch (error) {
        throw error
    }
}

module.exports = {
    indexPage,
    getAll
}
