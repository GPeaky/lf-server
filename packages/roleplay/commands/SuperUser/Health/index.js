mp.events.addCommandGroup('heal', ['superUser'], (player, id) => {
    const playerTarget = mp.players.at(id);
    ( playerTarget ) ? player = playerTarget : player;
    
    player.health = 100;
    player.shared.status = {
        hunger: 100,
        thirst: 100
    }
    player.notify('You are healed')
});