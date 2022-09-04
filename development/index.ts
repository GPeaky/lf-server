import { databaseConnection } from "./database";

const main = async() => {
    try {
        await databaseConnection()

        require('./ipl')

        require('./utils')

        require('./core')

    } catch (e) {
        throw new Error(`Unexpected error has occurred \n${ e }`)
    }
}

main();