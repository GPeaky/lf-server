const bycryptjs = require('bcryptjs')

mp.events.add('playerReady', async player => player.logout())


const handleLogin = async (player, email, password)  => {
    const PlayerDB = await player.exist(email, password)
    if (!PlayerDB) return player.create(email, password)
    if (PlayerDB.password === bycryptjs.hashSync(password, bycryptjs.genSaltSync())) {
        player.load(email)
    }
}

mp.events.add('submitLogin', handleLogin)