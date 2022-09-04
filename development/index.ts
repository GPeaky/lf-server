import { databaseConnection } from "./database";

const main = async() => {
    try {
        await databaseConnection()

        console.log('WE need more')

    } catch (e) {
        throw new Error(`Unexpected error has occurred \n${ e }`)
    }
}

main();