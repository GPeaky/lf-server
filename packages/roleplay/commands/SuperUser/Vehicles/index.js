mp.events.addCommandGroup('veh', ['superUser'], (player, vehicle) => {
    player.spawnVehicle(vehicle, new mp.Vector3(player.position.x, player.position.y + 3.0, player.position.z), player.heading)
});

mp.events.addCommandGroup('setDim', ['superUser'], (player, _fullText, target, dimNumber) => {
    if (target == 'me') return player.dimension = Number(dimNumber);
    if (!target || !dimNumber) return player.outputChatBox('Usage: /setDim [playerId | me], [dimension]');
    if (!mp.players.at(Number(target))) return player.outputChatBox('Player not found with ID ${target}');
    mp.players.at(Number(target)).dimension = Number(dimNumber);
});

mp.events.addCommandGroup('fix', ['superUser'], player => {
    player.repairVehicle()
})

mp.events.addCommandGroup('dv', ['superUser'], async (player, range) => {   
    if( !range ) range = 1.5;
    if (player.vehicle) return player.deleteVehicle()

    mp.vehicles.forEachInRange(player.position, range, async vehicle => {
        if (vehicle.dimension != player.dimension) return
        await mp.utils.wait(1)
        vehicle.destroy();
    })
});


mp.events.addCommandGroup('vehBring', ['superUser'], (player, vehId) => {
    const vehicle = mp.vehicles.at(vehId);
    if (vehId == -1) return mp.vehicles.forEach(vehicle => vehicle.position = player.position)
    if (vehicle) return vehicle.setPosition(player.position);
    player.outputChatBox("Vehicle not found.");
});