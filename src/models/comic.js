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
    },
    publisher: {
        type: String,
    },
    read: {
        type: Boolean,
        default: false,
    },
})

module.exports = Comics
