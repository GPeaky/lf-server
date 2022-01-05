const logger = require('logger').createLogger('./logs/database.log');
const Sequelize = require('sequelize');

const { SQ_NAME, SQ_USER, SQ_PASS } = process.env;

<<<<<<< HEAD
            getPlayerByWallet: async wallet => {
                return await prisma.players.findUnique({
                    data: {
                        wallet
                    }
                })
            }
        },
        Vehicles : prisma.vehicles,
        Transactions : prisma.transactions,
    }
}
=======
module.exports = new Sequelize(SQ_NAME, SQ_USER, SQ_PASS, {
    host: 'localhost',
    dialect: 'mariadb',
    logging: log => logger.info(log)
})
>>>>>>> parent of 2c57541 (feat(database): added prisma again)
