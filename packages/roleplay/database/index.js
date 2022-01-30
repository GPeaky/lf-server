const database = require('../config/database');
const Players = require('./models/Players');

module.exports = async () => {
    try {
        mp.database = {
            Players: Players,
            Vehicles: require('./models/Vehicles'),
            Transactions: require('./models/Transactions'),
            Houses: require('./models/Houses'),
        }

        Object.keys(mp.database).forEach(name => console.log(`[Database] Loaded ${name}`));
        
        mp.database.Players.getPlayerByWallet = async wallet => {
            return await Players.findOne({
                where: {
                    wallet: wallet
                }
            })
        }

        await database.sync();
        console.log('Database Synced!'.green);
    } catch ( err ) {
        console.log('Database Error: '.red, err );
    }
}