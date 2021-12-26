const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const Keys = sequelize.define('vehicles_keys', {
    plate: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },

    owners: {
        type: Sequelize.STRING(2500),
        allowNull: true
    }
})

module.exports = Keys;