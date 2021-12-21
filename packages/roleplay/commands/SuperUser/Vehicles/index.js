mp.events.addCommand('veh', (player, vehicle) => {
    player.spawnVehicle(vehicle, player.position, player.heading)
});

mp.events.addCommand('fix', player => {
    player.repairVehicle(player)
})

mp.events.addCommand('dv', player => {
    player.deleteVehicle()
});

mp.events.addCommand('vehBring', (player, vehId) => {
    const vehicle = mp.vehicles.at(vehId);
    if (vehicle) return vehicle.setPosition(player.position);
    player.outputChatBox("Vehicle not found.");
});