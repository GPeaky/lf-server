const Sequelize = require('sequelize');

const { SQ_NAME, SQ_USER, SQ_PASS } = process.env;

module.exports = new Sequelize(SQ_NAME, SQ_USER, SQ_PASS, {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
})