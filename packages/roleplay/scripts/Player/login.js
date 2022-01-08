// const bycryptjs = require('bcryptjs')
const argon2 = require('argon2')

mp.events.add('playerReady', async player => player.logout())


const handleLogin = async (player, email, password)  => {
    const PlayerDB = await player.exist(email, password)
    if (!PlayerDB) return player.create(email, password)
    if (await argon2.verify(PlayerDB.password, password)) {
        player.load(email)
    }
}

mp.events.add('submitLogin', handleLogin)