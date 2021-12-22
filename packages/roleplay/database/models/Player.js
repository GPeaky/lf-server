const bcryptjs = require('bcryptjs');
const Sequelize = require('sequelize');
const sequelize = require('../../config/database')

const Player = sequelize.define('player', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,

        validate: {
            isEmail: true
        }
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: (player) => {
            player.password = bcryptjs.hashSync(player.password, bcryptjs.genSaltSync());
        }
    }
})

module.exports = Player