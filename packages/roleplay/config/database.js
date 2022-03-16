const mongoose = require('mongoose')

const databaseConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log('Database Connection Established');
    } catch( err ) {
        throw new Error('cant initialize database connection');
    }
}

module.exports = databaseConnection