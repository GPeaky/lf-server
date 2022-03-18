// const bycryptjs = require('bcryptjs')
const argon2 = require('argon2')

mp.events.add('playerReady', async player => player.logout())

mp.events.add('submitLogin', async (player, email, password)  => {
    try {
        const Player = await player.exist(email, password)
        if (!Player) return player.create(email, password)

        if (await argon2.verify(Player.password, password)) player.load(Player)
    } catch (err) {
        console.log(err)
    }
})