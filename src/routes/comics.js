const express = require('express')
const Comic = require('../models/comic')

const router = new express.Router()

// create a comic
router.post('/comics', async (req, res) => {
    const comic = new Comic(req.body)
    try {
        await comic.save()
        res.status(201).send()
    } catch (e) {
        res.status(400).send(e)
    }
})

// get all comics
router.get('/comics', async (req, res) => {
    try {
        const comics = await Comic.find({})
        res.send(comics)
    } catch (e) {
        res.status(500).send(e)
    }
})

// get single comic
router.get('/comics/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const comic = await Comic.find({ id: _id })

        if (!comic) {
            return res.status(404).send()
        }
        res.send(comic)
        return true
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/comics/:id', async (req, res) => {
    try {
        await Comic.findByIdAndRemove(req.params.id)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
