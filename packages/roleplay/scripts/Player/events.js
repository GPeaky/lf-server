const { ExistPlayer, CreatePlayer, LoadPlayer } = require('./controller')
const { SERVER_NAME } = process.env

mp.events.add('playerJoin', player => console.log(`[${SERVER_NAME.yellow}] - ${player.name} joined to the server` ))
mp.events.add('playerLeft', player => console.log(`[${SERVER_NAME.yellow}] - ${player.name} left the server` ))


mp.events.add('playerReady', async (player) => {
    const exits = await ExistPlayer(player)
    if(!exits){
        CreatePlayer(player)
    }else{
        LoadPlayer(player)
    }
})