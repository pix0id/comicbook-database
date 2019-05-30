const express = require('express')
const router = new express.Router()
const siteTitle = 'CBDB - Comic Book DataBase'

/**
 * START ROUTES
 */

// index
router.get('/', (req, res) => {
    res.render('index', {
        title: 'CBDB',
        siteTitle
    })
})


// 404 page - keep as last route
router.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.'
    })
})

module.exports = router