const { v4: uuidv4 } = require('uuid');
const bcryptjs = require('bcryptjs');
const Sequelize = require('sequelize');
const sequelize = require('../../config/database')

const Players = sequelize.define('player', {
    id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true
    },
    
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    data:{
        type: Sequelize.STRING(10000),
        allowNull: false,
    },

    role: {
        type: Sequelize.STRING,
        defaultValue: 'user',
        allowNull: false,

        validate: {
            isIn: [['user', 'superUser']]
        }
    }

}, {
    hooks: {
        beforeValidate: player => {
            player.id = uuidv4();
        }
    }
})

mp.database.Players = Players

module.exports = Players