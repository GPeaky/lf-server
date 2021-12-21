const database = require('../../../config/database');

module.exports = async () => {
    try {
        // require All Database Models Here


        await database.sync();
        console.log('Database Synced!'.green);
    } catch ( err ) {
        console.log('Database Error: '.red);
    }
}