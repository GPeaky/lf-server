const { Save } = require('./index.js')

setInterval(() => {
    mp.vehicles.forEach(vehicle => {
        if (vehicle?.isPersistent) {
            Save(vehicle)
        }
    })
    console.log(`Saved #${mp.vehicles.length} vehicles`)
}, 5000);