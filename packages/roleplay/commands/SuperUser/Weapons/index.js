mp.events.addCommandGroup('giveWep', ['superUser'], (player, _args, id,weapon, ammo) => {
    const playerById = mp.players.at(id)
    playerById ? player = playerById : player

    if ( weapon ){
        player.giveWeapon(mp.joaat(`weapon_${weapon}`), parseInt(ammo) || 250);
        player.notify(`You have been given ${weapon}`);
    } else player.notify('Please enter a weapon name.');
})

mp.events.addCommandGroup('removeWep', ['superUser'], (player, _args, id, weapon) => {
    const playerById = mp.players.at(id)
    playerById ? player = playerById : player
    
    if( weapon ) {
        player.removeWeapon(mp.joaat(`weapon_${weapon}`));
        player.notify(`You have been removed ${weapon}`);
    } else player.notify('Invalid Weapon')
})