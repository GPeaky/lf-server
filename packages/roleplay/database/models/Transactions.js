const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database')

const Transactions = sequelize.define('transactions', {
    id: {
        type: DataTypes.STRING(360),
        allowNull: false,
        primaryKey: true
    },
    
    wallet: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },

    amountWei: {
        type: DataTypes.STRING,
        allowNull: false
    },

    amountParsed: {
        type: DataTypes.STRING,
        allowNull: false
    },

    nonce:{
        type: DataTypes.STRING(64),
        allowNull: false,
    },

    type: {
        type: DataTypes.STRING(256),
        defaultValue: 'unkown',
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING(256),
        defaultValue: 'unkown',
        allowNull: false,
    },

    confirmations: {
        type: DataTypes.INTEGER(2),
        defaultValue: 0,
        allowNull: false,
    },
})

module.exports = Transactions