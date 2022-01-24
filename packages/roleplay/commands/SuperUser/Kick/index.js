mp.events.addCommandGroup('kick', ['superUser'], (player, id) => {
    const playerTarget = mp.player.at(id)
    if( !playerTarget ) return player.outputChatBox('kick command usage: /kick [playerId]')

	playerTarget.outputChatBox("You have been kicked from the server.");
	playerTarget.kick('Kicked.');
})