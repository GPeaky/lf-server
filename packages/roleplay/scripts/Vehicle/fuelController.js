setInterval(() => {
    mp.vehicles.forEach(vehicle => {
        if (!vehicle.fuel > 0) {return; vehicle.engine = false}; vehicle.engine = true
        if (!vehicle.getOccupant(0)) return
        const fuelMinus = Math.floor(Math.random() * 2) + 1
        if (vehicle.getSpeed() > 5.0) vehicle.fuel -= fuelMinus
    })
}, 2 * 60 * 1000);

mp.events.add("trailerAttached", (vehicle, trailer) => {
    console.log(vehicle.numberPlate, trailer.numberPlate)
});