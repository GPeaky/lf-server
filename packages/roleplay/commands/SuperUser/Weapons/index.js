mp.events.addCommandGroup('giveWep', ['superUser'], (player, _args, id,weapon, ammo) => {
    mp.players.at(id) ? player = mp.players.at(id) : player
    if ( !weapon ) return player.notify('Sorry, you need to enter a weapon name.')

    player.giveWeapon(mp.joaat(`weapon_${weapon}`), parseInt(ammo) || 250)
    player.notify(`You have been given ${weapon}`)
})

mp.events.addCommandGroup('removeWep', ['superUser'], (player, _args, id, weapon) => {
    mp.players.at(id) ? player = mp.players.at(id) : player
    if ( !weapon ) return player.notify('Sorry, you need to enter a weapon name.');
    
    player.removeWeapon(mp.joaat(`weapon_${weapon}`))
    player.notify(`You have been removed ${weapon}`)
})