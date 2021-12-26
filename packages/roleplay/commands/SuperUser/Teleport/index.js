mp.events.addCommandGroup('goto', ['superUser'], (player, id) => {
    const targetPlayer = mp.players.at(id)
    if (!targetPlayer) return;
    player.position = targetPlayer.position
})

mp.events.addCommandGroup('tp', ['superUser'], (player, fullText, x, y, z) => {
    console.log(x, y, z)
    player.position = new mp.Vector3(Number(x), Number(y), Number(z))
})