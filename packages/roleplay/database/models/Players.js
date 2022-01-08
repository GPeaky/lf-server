const argon2 = require('argon2');
const { nanoid } = require('nanoid');
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database')

const Players = sequelize.define('player', {
    identifier: {
        type: DataTypes.STRING(9),
        defaultValue: () => nanoid(9)
    },
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

        validate: {
            isEmail: true,
            notEmpty: true
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    data:{
        type: DataTypes.TEXT('long'),
        allowNull: false,

        validate: {
            isJSON: true,
        }
    },

    role: {
        type: DataTypes.ENUM('user', 'superUser'),
        defaultValue: 'user',
        allowNull: false
    },

    wallet: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: 'unkown',
    }

}, {
    hooks: {
        beforeCreate: async (player) => {
            player.password = await argon2.hash(player.password);
        }
    }
})

module.exports = Players