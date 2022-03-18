// const bycryptjs = require('bcryptjs')
const argon2 = require('argon2')

mp.events.add('playerReady', async player => player.logout())

mp.events.add('submitLogin', async (player, email, password)  => {
    try {
        console.log(`${player.name} is trying to login`)

        const PlayerDB = await player.exist(email, password)
        if (!PlayerDB) return player.create(email, password)

        if (await argon2.verify(PlayerDB.password, password)) player.load(PlayerDB)
    } catch (err) {
        console.log(err)
    }
})