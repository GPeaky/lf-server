const { Save } = require('./controller.js')

setInterval(() => {
    if(mp.players.length > 0 && mp.vehicles.length > 0) {
        mp.vehicles.forEach(vehicle => {
            if (vehicle?.isPersistent) {
                Save(vehicle)
            }
        })
        console.log(`Saved #${mp.vehicles.length} vehicles`)
    }
}, 5000);