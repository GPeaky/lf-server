mp.events.addCommand('giveWep', (player, weapon, ammo) => {
    if (!player.hasWeapon(weapon)) {
        player.giveWeapon(mp.joaat(weapon), ammo);
        player.notify(`You have been given ${weapon}`);
    } else player.notify('You already have this weapon.'); 
})

mp.events.addCommand('removeWep', (player, weapon) => {
    if (player.hasWeapon(weapon)) {
        player.removeWeapon(mp.joaat(weapon));
        player.notify(`You have removed ${weapon}`);
    } else player.notify('You don\'t have this weapon.');
})