import { databaseConnection } from "./database";

const main = async() => {
    try {
        await databaseConnection()

        require('./ipl')

    } catch (e) {
        throw new Error(`Unexpected error has occurred \n${ e }`)
    }
}

main();