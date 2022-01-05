const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Vehicles = sequelize.define('vehicles', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },

    model: {
        type: DataTypes.STRING,
        allowNull: false
    },

    data: {
        type: DataTypes.STRING(10000),
        allowNull: false
    }
})

module.exports = Vehicles;