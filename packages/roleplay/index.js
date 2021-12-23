require('colors');
require('dotenv').config();
const syncDatabase = require('./database')

const main = async () => {
    try {
        await syncDatabase();

        // Utils
        require('./utils')
        // Controllers
        require('./scripts')
        // Models
        require('./models')
        // Commands 
        require('./commands')
        // Tests
        require('./tests')
    } catch ( err ) {
        console.log('[WARN] '.red + err);
    }
}

main();