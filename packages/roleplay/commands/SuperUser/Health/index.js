mp.events.addCommandGroup('heal', ['superUser'], (player, id) => {
    player = mp.players.at(id) ?? player
    
    player.health = 100
    player.shared.status.hunger = 100
    player.shared.status.thirst = 100
    player.shared.status.stamina = 100
    player.notify('You have been healed.')
});