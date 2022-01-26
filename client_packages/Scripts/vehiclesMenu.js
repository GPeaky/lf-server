const locateVehicle = position => {
    const { streetName } = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
	return mp.game.ui.getStreetNameFromHashKey(streetName)
}

mp.events.add('vehiclesMenu', _vehicles => {
	const vehicles = JSON.parse(_vehicles)
	const menu = new mp.core.Menu(`<div style="color:#D95F69"> <i class="fas fa-car"></i> Vehicles </div>`,
		vehicles.map((vehicle, index) => {
			index++
			return {
				value: vehicle.id,
				label: `${index}. ${mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model)}`,
				dataOption: {
					'<i class="fas fa-location-arrow" style="color:#D95F69"></i> Location': locateVehicle(vehicle.position),
					'<i class="fas fa-id-card" style="color:#D95F69"></i> NumberPlate': vehicle.numberPlate,
					'<i class="fas fa-x-ray" style="color:#D95F69"></i> Status': vehicle.health ?? '100%',
					'<i class="fas fa-gas-pump" style="color:#D95F69"></i> Fuel': vehicle.fuel,
				},

				submitLabel: '<i class="fas fa-compass" style="color:#D95F69"></i> Locate'
			}
		})
	)

	menu.on('optionClicked', async option => {
		const vehicle = await mp.vehicles.atRemoteId(option.value)
		if (!vehicle) return

		const blip = await mp.blips.new(225, vehicle.position, {
			name: 'Vehicle',
			scale: '0.8',
			alpha: 255,
			color: 35
		})

		const destroyBlip = setInterval(() => {
			const { x: vehiclePositionX, y: vehiclePositionY, z: vehiclePositionZ} = vehicle.position
			const { x: playerPositionX, y: playerPositionY, z: playerPositionZ } = mp.players.local.position

			if ( mp.game.gameplay.getDistanceBetweenCoords(playerPositionX, playerPositionY, playerPositionZ, vehiclePositionX, vehiclePositionY, vehiclePositionZ, false) < 5) {
				blip.destroy() 
				clearInterval(destroyBlip)
			}
		}, 500)

		blip.setRoute(true)
		blip.setRouteColour(35)
		menu.hide()
	})
})