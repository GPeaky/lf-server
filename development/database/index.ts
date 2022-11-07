import mongoose from "mongoose"
import player from './models/Player'
import vehicle from "./models/Vehicle"
import { DATABASE_URL } from '@config/variables'

export const databaseConnection = async () => {
    try {
        mp.database = { player, vehicle }
        await mongoose.connect(DATABASE_URL!)

        console.log('We connected with the database correctly!')
    } catch (e) {
        console.log('We had an error connecting to the database')
    }
}