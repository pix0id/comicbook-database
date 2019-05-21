const path = require('path')

const express = require('express')
const hbs = require('hbs')


const validation = require('./utils/validation')
const comicAPI = require('./utils/comic_api')

const app = express()
const port = process.env.PORT || 3000

// paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set handlebards engine and views/paritals location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set static directory to serve.
app.use(express.static(publicDirectoryPath))

// Website Title
const siteTitle = 'CBDB - Comic Book DataBase'

/**
 * START ROUTES
 */

// index
app.get('/', (req, res) => {
    res.render('index', {
        title: 'CBDB',
        siteTitle
    })
})

// add comic request
app.get('/add-comic', (req, res) => {
    if (!validation.addComicValidation(req.query)) {
        return res.send({
            message: 'Errors Found',
            error: utils.error,
            siteTitle
        })
    }
    res.send({
        message: 'comic added'
    })
    console.log(req)
})

// 404 page - keep as last route
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})