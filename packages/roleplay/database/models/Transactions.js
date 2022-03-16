const { Schema, model } = require('mongoose')

const Transactions = new Schema({
    _id: {
        type: String,
    },
    
    wallet: {
        type: String,
        required: true
    },

    amountWei: {
        type: String,
        required: true
    },

    amountParsed: {
        type: String,
        required: true
    },

    nonce: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true,
        default: 'unknown'
    },

    status: {
        type: String,
        required: true,
        default: 'pending'
    },

    confirmations: {
        type: Number,
        required: true,
        default: 0
    }

})

module.exports = model('Transactions', Transactions)