const databaseConnection = require('../config/database');
const Players = require('./models/Players');

module.exports = async () => {
    try {
        await databaseConnection()

        mp.database = {
            Players: Players,
            Vehicles: require('./models/Vehicles'),
            Transactions: require('./models/Transactions'),
            Houses: require('./models/Houses'),
        }
        
        mp.database.Players.getPlayerByWallet = async wallet => {
            return await Players.find({
                wallet: wallet
            })
        }
        
        console.log('Database Synced!'.green);
    } catch ( err ) {
        console.log('Database Error');
    }
}