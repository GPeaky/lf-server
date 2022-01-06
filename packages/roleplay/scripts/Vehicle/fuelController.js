setInterval(() => {
    mp.vehicles.forEach(vehicle => {
        console.log(vehicle.rpm)
    })
}, 500);