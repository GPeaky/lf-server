const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const Vehicles = sequelize.define('vehicles', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },

    owner: {
        type: Sequelize.STRING(250),
        allowNull: true
    },

    model: {
        type: Sequelize.STRING,
        allowNull: false
    },

    data: {
        type: Sequelize.STRING(10000),
        allowNull: false
    }
})

module.exports = Vehicles;