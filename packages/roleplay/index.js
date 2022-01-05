require('colors');
require('dotenv').config();
const syncDatabase = require('./database')

const main = async () => {
    try {
        // Database
        await syncDatabase();
        // Ipl
        require('./ipl')
        // Utils
        require('./utils')
        // Models
        require('./models')
        // Controllers
        require('./scripts')
        // Commands 
        require('./commands')
        // Tests
        require('./tests')
    } catch ( err ) {
        console.log('[WARN] '.red + err);
    }
}

main();