const mongoose = require('mongoose')

const Comics = mongoose.model('Comics', {
    title: {
        type: String,
        trim: true,
        required: true,
    },
    issue: {
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: String,
        trim: true,
    },
    publisher: {
        type: String,
        trim: true,
    },
    artist: {
        type: String,
        trim: true,
    },
    writer: {
        type: String,
        trim: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
})

module.exports = Comics
