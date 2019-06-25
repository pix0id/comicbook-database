const express = require('express')

const router = new express.Router()
const siteTitle = 'CBDB - Comic Book DataBase'
const title = 'CBDB'

/**
 * START ROUTES
 */

// index
router.get('/', (req, res) => {
    res.render('index', {
        title,
        siteTitle,
    })
})

router.get('/collection', (req, res) => {
    res.render('collection', {
        title,
        siteTitle,
    })
})

router.get('/add-comic', (req, res) => {
    res.render('add-comic', {
        title,
        siteTitle,
    })
})

// 404 page - keep as last route
router.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
    })
})

module.exports = router
