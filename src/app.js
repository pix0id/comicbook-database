const path = require('path')


const express = require('express')
const hbs = require('hbs')
const mongoose = require('mongoose')

require('./db/mongoose')

const Comic = require('./models/comic')

// require routers
const comicRouter = require('./routes/comics')
const pagesRouter = require('./routes/pages')

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

app.use(express.json())

// set Routes
app.use(comicRouter)
app.use(pagesRouter)


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})