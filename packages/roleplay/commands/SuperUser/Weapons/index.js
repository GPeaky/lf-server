mp.events.addCommand('giveWep', (player, args, weapon, ammo) => {
    if ( weapon ){
        player.giveWeapon(mp.joaat(`weapon_${weapon}`), parseInt(ammo) || 250);
        player.notify(`You have been given ${weapon}`);
    } else player.notify('Please enter a weapon name.');
})

mp.events.addCommand('removeWep', (player, weapon) => {
    if( weapon ) {
        player.removeWeapon(mp.joaat(`weapon_${weapon}`));
        player.notify(`You have been removed ${weapon}`);
    } else player.notify('Invalid Weapon')
})