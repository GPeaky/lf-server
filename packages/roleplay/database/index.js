const database = require('../config/database');

module.exports = async () => {
    try {
        mp.database = {}
        // require All Database Models Here
        require('./models/Vehicles')
        require('./models/Players')
        require('./models/Transactions')

        await database.sync();
        console.log('Database Synced!'.green);
    } catch ( err ) {
        console.log('Database Error: '.red, err );
    }
}