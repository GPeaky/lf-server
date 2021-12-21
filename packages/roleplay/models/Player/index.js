mp.events.add('playerReady', player => {
    player.spawnVehicle = vehicle => {
        if (vehicle) {
            const veh = mp.vehicles.new(mp.joaat(vehicle), player.position, {
                dimension: player.dimension,
            })
            player.putIntoVehicle(veh, 0);
        } else player.notify('Vehicle not found.');
    }
})

