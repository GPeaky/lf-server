mp.events.addCommandGroup('kick', ['superUser'], (player, id) => {
    const newTarget = mp.players.at(id)
    if(!newTarget) return player.outputChatBox("Syntax: /kick [playerID]");
    if(newTarget === null) return player.outputChatBox("There is no player online with the ID given.")
	newTarget.outputChatBox("You have been kicked from the server.");
	newTarget.kick('Kicked.');
})