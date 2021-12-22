const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const Vehicles = sequelize.define('vehicles', {
    model: {
        type: Sequelize.STRING,
        allowNull: false
    },

    data: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Vehicles;