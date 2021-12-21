require('colors');
require('dotenv').config();
const syncDatabase = require('./database')

const main = async () => {
    try {
        await syncDatabase();

        // Utils
        require('./utils')
        // Models
        require('./models')
        // Events
        require('./events')
        // Commands 
        require('./commands')
    } catch ( err ) {
        console.log('Database Error: '.red);
    }
}

main();