const { Add, Remove } = require('../../../scripts/Vehicle_Keys/controller')

mp.events.addCommandGroup('removeKey', ['superUser'], (player, userID) => {
    if(player.vehicle && player.vehicle.owner == player.identifier) {
        Remove(player.vehicle.plate, mp.players.at(userID).identifier)        
    }else player.notify('~r~You need to be in a vehicle to remove a key.')
})

mp.events.addCommandGroup('addKey', ['superUser'], (player, userID) => {
    if(player.vehicle && player.vehicle.owner == player.identifier) {
        Add(player.vehicle.plate, mp.players.at(userID).identifier)        
    }else player.notify('~r~You need to be in a vehicle to add a key.')
})

mp.events.addCommandGroup('veh', ['superUser'], (player, vehicle) => {
    player.spawnVehicle(vehicle, player.position, player.heading)
});

mp.events.addCommandGroup('fix', ['superUser'], player => {
    player.repairVehicle()
})

mp.events.addCommandGroup('dv', ['superUser'], player => {
    player.deleteVehicle()
});

mp.events.addCommandGroup('vehBring', ['superUser'], (player, vehId) => {
    if (vehId == -1) return mp.vehicles.forEach(vehicle => vehicle.position = player.position)
    const vehicle = mp.vehicles.at(vehId);
    if (vehicle) return vehicle.setPosition(player.position);
    player.outputChatBox("Vehicle not found.");
});