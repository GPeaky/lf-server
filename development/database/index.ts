import mongoose from "mongoose"
import { DATABASE_URL } from '../config/variables'

export const databaseConnection = async () => {
    try {
        import('./models/Vehicle')
        import('./models/Player')

        await mongoose.connect(DATABASE_URL!)

        console.log('We connected with the database correctly!')
    } catch (e) {
        throw new Error('We cannot connect with database')
    }
}