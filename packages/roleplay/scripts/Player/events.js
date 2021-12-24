const { CreatePlayer, LoadPlayer } = require('./controller')
const { SERVER_NAME } = process.env

mp.events.add('playerJoin', player => console.log(`[${SERVER_NAME.yellow}] - ${player.name} joined to the server` ))
mp.events.add('playerLeft', player => console.log(`[${SERVER_NAME.yellow}] - ${player.name} left the server` ))


mp.events.add('playerReady', async (player) => {
    const exits = await player.exist()
    console.log(exits)
    if(!exits){
        player.create()
    }else{
        LoadPlayer(player)
    }
})