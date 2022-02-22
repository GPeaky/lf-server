const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database')
const { nanoid } = require('nanoid');

const Houses = sequelize.define('houses', {
    id: {
        type: DataTypes.STRING(9),
        primaryKey: true,
        defaultValue: () => nanoid(9)
    },
    
    owner: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },

    data: {
        type: DataTypes.TEXT,
        allowNull: false,

        validate: {
            isJSON: true,
        }
    },
})

module.exports = Houses