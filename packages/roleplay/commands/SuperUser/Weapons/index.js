mp.events.addCommandGroup('giveWep', ['superUser'], (player, _args, id, weapon, ammo) => {
    player = mp.players.at(id) ?? player
    if ( !weapon ) return player.outputChatBox('Usage: /giveWep [playerId] [weapon] [ammo]')

    player.giveWeapon(mp.joaat(`weapon_${weapon}`), parseInt(ammo) || 250);
    player.notify(`You have been given ${weapon}`);
})

mp.events.addCommandGroup('removeWep', ['superUser'], (player, _args, id, weapon) => {
    player = mp.players.at(id) ?? player
    if ( !weapon ) return player.outputChatBox('Usage: /removeWep [playerId] [weapon]')

    player.removeWeapon(mp.joaat(`weapon_${weapon}`));
    player.notify(`You have been removed ${weapon}`);
})