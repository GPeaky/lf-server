const { v4: uuidv4 } = require('uuid');
const bcryptjs = require('bcryptjs');
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database')

const Players = sequelize.define('player', {
    identifier: {
        type: DataTypes.STRING(36),

        // set() {
        //     this.setDataValue('identifier', uuidv4());
        // }
    },
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        
        set(val) {
            this.setDataValue('password', bcryptjs.hashSync(val, 10));
        }
    },

    data:{
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },

    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
        allowNull: false,

        validate: {
            isIn: [['user', 'superUser']]
        }
    },

    wallet: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: 'unkown',
    }

}, {
    hooks: {
        beforeValidate: player => {
            player.identifier = uuidv4();
        }
    }
})

module.exports = Players