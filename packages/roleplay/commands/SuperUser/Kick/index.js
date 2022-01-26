mp.events.addCommandGroup('kick', ['superUser'], ( player, id ) => {
    const newTarget = mp.players.at(id)
    if( !newTarget ) return player.outputChatBox("Syntax: /kick [playerID]");

	newTarget.outputChatBox("You have been kicked from the server.");
	newTarget.kick('Kicked.');
})