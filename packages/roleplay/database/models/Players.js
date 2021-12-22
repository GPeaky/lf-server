// const bcryptjs = require('bcryptjs');
const Sequelize = require('sequelize');
const sequelize = require('../../config/database')

const Players = sequelize.define('player', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true/*,

        validate: {
            isEmail: true
        }*/
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    data:{
        type: Sequelize.STRING(10000),
        allowNull: false,
        
    }

}, {
    /*hooks: {
        beforeCreate: (player) => {
            player.password = bcryptjs.hashSync(player.password, bcryptjs.genSaltSync());
        }
    }*/
})

module.exports = Players