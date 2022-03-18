const { nanoid } = require('nanoid')
const { Schema, model } = require('mongoose')

const Players = new Schema({
    _id: {
        type: String,
        default: () => nanoid(9)
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    data: {
        type: Object,
        required: true
    },

    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'superUser']
    },

    balance: {
        type: String,
        required: true,
        default: '0'
    },

    wallet: {
        type: String,
        required: true,
        default: 'unknown'
    }
})

module.exports = model('Players', Players)