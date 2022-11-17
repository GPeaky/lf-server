import {databaseConnection} from './database'

const main = async (): Promise<string> => {
    try {
        await databaseConnection()

        import('./utils')

        import('./utils')

        import('./core')

        return 'Server started successfully'
    } catch (e: any) {
        return e
    }
}

void main()
    .then((msg: string) => {
        console.log(msg)
    })
    .catch((e: Error) => {
        // @ts-expect-error
        throw new Error(e)
    })
