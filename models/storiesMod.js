const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stories = new Schema({
    title: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true,
    },
    firstName: String,
    lastName: String,
    dateNaiss: String,
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('stories', stories)