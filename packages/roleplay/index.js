require('colors');
require('dotenv').config();
const syncDatabase = require('./database')

const main = async () => {
    try {
        // Ipl
        require('./ipl')
        // Utils
        require('./utils')
        // Database
        await syncDatabase();
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