const { ExistPlayer, CreatePlayer, LoadPlayer } = require('./controller')
const { SERVER_NAME } = process.env

mp.events.add('playerJoin', async (player) => {
    console.log(`[${SERVER_NAME.yellow}] - ${player.name} joined to the server` );
    const exits = await ExistPlayer(player)
    if(!exits){
        CreatePlayer(player)
    }else{
        LoadPlayer(player)
    }
})

mp.events.add('playerLeft', player => {
    console.log(`[${SERVER_NAME.yellow}] - ${player.name} left the server` );
})