const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Vehicles = sequelize.define('vehicles', {
    id: {
        type: DataTypes.STRING(9),
        allowNull: false,
        primaryKey: true,
    },

    model: {
        type: DataTypes.STRING,
        allowNull: false
    },

    data:{
        type: DataTypes.TEXT,
        allowNull: false,

        validate: {
            isJSON: true,
        }
    },
})

module.exports = Vehicles;