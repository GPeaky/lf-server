const { nanoid } = require('nanoid')
const { Schema, model } = require('mongoose')

const Houses = new Schema({
    _id: {
        type: String,
        default: () => nanoid(9)
    },

    owner: {
        type: String,
        required: true
    },

    data: {
        type: Object,
        required: true
    }
})

module.exports = model('Houses', Houses)