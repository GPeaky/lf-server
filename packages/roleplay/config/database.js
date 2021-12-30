const logger = require('logger').createLogger('./logs/database.log');
const Sequelize = require('sequelize');

const { SQ_NAME, SQ_USER, SQ_PASS } = process.env;

module.exports = new Sequelize(SQ_NAME, SQ_USER, SQ_PASS, {
    host: 'localhost',
    dialect: 'mariadb',
    logging: log => logger.info(log)
})