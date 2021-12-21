mp.events.add('playerReady', player => {
    player.spawnVehicle = vehicle => {
        if (vehicle) {
            const veh = mp.vehicles.new(mp.joaat(vehicle), player.position, {
                dimension: player.dimension,
            })
            player.putIntoVehicle(veh, 0);
        } else player.notify('Vehicle not found.');
    }

    player.deleteVehicle = () => {
        if(player.vehicle) return player.vehicle.destroy(), player.notify('Vehicle Deleted.');
        player.notify('You are not in a vehicle.');
    }
})

