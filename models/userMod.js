const mongoose = require('mongoose')

const Schema = mongoose.Schema

const user = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: String,
    firstName: String,
    lastName: String,
    dateNaiss: String
}, { timestamps: true })

module.exports = mongoose.model('user', user)