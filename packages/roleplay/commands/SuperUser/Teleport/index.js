mp.events.addCommandGroup('goto', ['superUser'], (player, id) => {
    const targetPlayer = mp.players.at(id)
    if (!targetPlayer) return;
    player.position = targetPlayer.position
})