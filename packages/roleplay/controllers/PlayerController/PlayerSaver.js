const { SavePlayer } = require('./index.js')

setInterval(() => {
    mp.players.forEach(player => {
        SavePlayer(player)
    })
    console.log(`Saved #${mp.players.length} Players`)
}, 15000);