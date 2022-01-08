//* You can run this file to test your code.

mp.events.addCommand('vehicles', async player => {
    Object.keys(player.shared.vehicleKeys).map(async vehicleKey => {
        const { dataValues : { data } } = await mp.database.Vehicles.findOne({
            where: {
                id: player.shared.vehicleKeys[vehicleKey].vehicleNumberPlate
            }
        })

        if(!data) return console.log(`Vehicle not found${  player.shared.vehicleKeys[vehicleKey].vehicleNumberPlate}`);
        const vehicleData = JSON.parse(data);
        const vehicleStreet = await player.callProc('locateVehicle', [vehicleData.position]);
        player.outputChatBox(`${ vehicleStreet }, numberPlate: ${  player.shared.vehicleKeys[vehicleKey].vehicleNumberPlate}`);
    })
})