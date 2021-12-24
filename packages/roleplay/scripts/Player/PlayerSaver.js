const { SavePlayer } = require('./controller.js')

setInterval(() => {
    if(mp.players.length > 0) {
        mp.players.forEach(player => {
            SavePlayer(player)
        })
        console.log(`Saved #${mp.players.length} Players`)
    }
}, 5000);