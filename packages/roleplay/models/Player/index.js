const { Instantiate } = require('../../controllers/VehicleController')

mp.events.add('playerReady', (player) => {
    player.name = `${player.ip} - ${player.id} - ${player.socialClub}`
    player.spawnVehicle = (vehicle, position, heading) => {
        if (vehicle) {
            const veh = mp.vehicles.new(mp.joaat(vehicle), new mp.Vector3(position), {
                heading,
                numberPlate: mp.utils.generateNumberPlate(),
                dimension: player.dimension
            })

            veh.position = {x: position.x, y: position.y, z: position.z - 0.3};
            player.putIntoVehicle(veh, 0);
            Instantiate(veh)
        } else player.notify('Vehicle not found.');
    }

    player.repairVehicle = () => {
        if (player.vehicle) {
            player.vehicle.repair();
            player.notify('Vehicle repaired.');
        } else player.notify('You are not in a vehicle.');
    }

    player.deleteVehicle = () => {
        if(player.vehicle) return player.vehicle.destroy(), player.notify('Vehicle Deleted.');
        player.notify('You are not in a vehicle.');
    }
})