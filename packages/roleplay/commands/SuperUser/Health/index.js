mp.events.addCommandGroup('heal', ['superUser'], (player, id) => {
    player = mp.players.at(id) ?? player
    
    player.health = 100
    player.shared.status.hunger = 100
    player.shared.status.thirst = 100
    player.shared.status.stamina = 100
    player.notify('You have been healed.')
});

mp.events.addCommandGroup('revive', ['superUser'], (player, id) => {
    player = mp.players.at(id) ?? player
    if (!player.isDead) return player.notify('You are not death')

    player.spawn( player.position )
    player.shared.isDead = false
    player.shared.canRespawn = false
    player.notify('You have been revived!')
});