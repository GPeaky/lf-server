const { Schema, model } = require('mongoose')

const Vehicles = new Schema({
    _id: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true
    },

    data: {
        type: Object,
        required: true
    }
})

module.exports = model('Vehicles', Vehicles)