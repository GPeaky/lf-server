mp.events.addCommand('vehicles', async player => {
    const vehicles = [];
    await mp.vehicles.forEach(vehicle => {
        if ( vehicle.vehicleCreator !== player.shared.identifier ) return

        vehicles.push({
            id: vehicle.id,
            fuel: vehicle.fuel,
            model: vehicle.model,
            position: vehicle.position,
            numberPlate: vehicle.numberPlate
        })
    })
    player.call('vehiclesMenu', [ vehicles ])
})