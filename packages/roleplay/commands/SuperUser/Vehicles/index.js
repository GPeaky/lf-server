mp.events.addCommandGroup('veh', ['superUser'], (player, vehicle) => {
    player.spawnVehicle(vehicle, player.position, player.heading)
});

mp.events.addCommandGroup('fix', ['superUser'], player => {
    player.repairVehicle()
})

mp.events.addCommandGroup('dv', ['superUser'], (player, range) => {
    if( player.vehicle && !range ) return player.deleteVehicle();
    
    if( !range ) range = 10;
    mp.vehicles.forEachInRange(player.position, vehicle => {
        vehicle.destroy();
    })
});


mp.events.addCommandGroup('vehBring', ['superUser'], (player, vehId) => {
    if (vehId == -1) return mp.vehicles.forEach(vehicle => vehicle.position = player.position)
    const vehicle = mp.vehicles.at(vehId);
    if (vehicle) return vehicle.setPosition(player.position);
    player.outputChatBox("Vehicle not found.");
});