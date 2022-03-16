const argon2 = require('argon2')
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

        enum: ['player', 'admin']
    },

    balance: {
        type: String,
        required: true
    },

    wallet: {
        type: String,
        required: true,
        default: 'unknown'
    }
})

Players.passwordHashing = async (password) => {
    return await argon2.hash(password)
}

module.exports = model('Players', Players)