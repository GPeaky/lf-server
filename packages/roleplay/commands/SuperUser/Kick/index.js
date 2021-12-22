mp.events.addCommand('kick', (player, id) => {
    const newTarget = mp.players.at(id)
    if(!newTarget || isNaN(newTarget)) return player.outputChatBox("Syntax: /kick [playerID]");
    if(newTarget === null) return player.outputChatBox("There is no player online with the ID given.")
	newTarget.outputChatBox("You have been kicked from the server.");
	newTarget.kick('Kicked.');
})