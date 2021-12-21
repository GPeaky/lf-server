mp.events.addCommand('vehBring', (player, vehId) => {
    const vehicle = mp.vehicles.at(vehId);
    if (vehicle) return vehicle.setPosition(player.position);
    player.outputChatBox("Vehicle not found.");
})

mp.events.addCommand('veh', (player, vehicle) => {
    player.spawnVehicle(vehicle)
})

mp.events.addCommand('dv', player => {
    if(player.vehicle) return player.vehicle.destroy(), player.notify('Vehicle Deleted.');
    player.notify('You are not in a vehicle.');
})

mp.events.addCommand('giveWep', (player, weapon) => {
    if(!player.hasWeapon(weapon)) {
        player.giveWeapon(mp.joaat(weapon), 1000);
    }
})