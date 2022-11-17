import {databaseConnection} from './database'

const main = async () => {
    try {
        await databaseConnection()

        import('./utils')

        import('./utils')

        import('./core')

        return 'Main Runtime Finished'
    } catch (e) {
        throw new Error(`Unexpected error has occurred \n${e}`)
    }
}

main().then((msg: string) => {
    console.log(msg)
})
