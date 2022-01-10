mp.events.addCommandGroup('goto', ['superUser'], (player, id) => {
    const targetPlayer = mp.players.at(id)
    if (!targetPlayer) return player.notify('Player not found');

    player.position = targetPlayer.position;
    player.notify(`Teleported to ${targetPlayer.name}`);
    targetPlayer.notify(`${player.name} has been teleported to you`);	
})

mp.events.addCommandGroup('bring', ['superUser'], (player, id) => {
    const playerTarget = mp.players.at(id);
    if (!playerTarget) return player.notify('Player not found');

    playerTarget.position = player.position
    playerTarget.notify(`You have been teleported by ${player.name}`)
    player.notify(`${playerTarget.name} has been teleported to you`)
})

mp.events.addCommandGroup('tp', ['superUser'], (player, fullText, x, y, z) => {
    if (!x || !y || !z) return player.outputChatBox("Syntax: /tp x y z")
    player.position = new mp.Vector3(Number(fullText))
})