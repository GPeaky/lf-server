// * Go To
mp.events.addCommandGroup('goto', ['superUser'], (player, id) => {
    const targetPlayer = mp.players.at(id)
    if (!targetPlayer) return;
    player.position = targetPlayer.position
})

//* Teleport to coords
mp.events.addCommandGroup('tp', ['superUser'], (player, position, x, y, z) => {
    player.position = new mp.Vector3(Number(x), Number(y), Number(z));
})