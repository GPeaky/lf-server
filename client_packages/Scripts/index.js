const getLocalVehicle = async(vehicleId) => {
    const vehicleLocal = mp.players.local.vehicle
    if (vehicleLocal?.remoteId == vehicleId) return vehicleLocal
    return false
}

const offSetMapper = [
    // Parte Izquierda
    { x: 1.0, y: 0.0, z: 0.0 },

    // Parte Derecha
    {  x: -1.0, y: 0.0, z: 0.0 },
    
    // Morro trasero
    {  x: 0.0, y: -1.0, z: 0.0 },

    // Morro delantero
    { x: 0.0, y: 1.0, z: 0.0 },
]   

let vehicleActive = false

setInterval(() => {
    const vehicle = mp.players.local?.vehicle
    if (!vehicle || !vehicleActive) return;
    const finalDeformationMap = {}
    for (let i = 0; i < offSetMapper.length; i++) {
        const coords = offSetMapper[i];
        const vehicleDeformation = vehicle.getDeformationAtPos(coords.x, coords.y, coords.z)
        // mp.gui.chat.push(`${JSON.stringify(vehicleDeformation)} ${(vehicleDeformation.x + vehicleDeformation.y + vehicleDeformation.z) * -10000} - ${i}`)
        finalDeformationMap[i] = {
            index: i,
            mapX: coords.x + vehicleDeformation.x,
            mapY: coords.y + vehicleDeformation.y,
            mapZ: coords.z + vehicleDeformation.z,
            multiplier: (vehicleDeformation.x + vehicleDeformation.y + vehicleDeformation.z) * -10000
        }
    }
    mp.events.callRemote('setVehicleDeformationMap', JSON.stringify(finalDeformationMap))
}, 5000);

mp.events.add('vehicleSync::Client', async (vehicleId, vehicleData) => {
    const vehicle = await getLocalVehicle(vehicleId)
    if (vehicle) {
        // mp.gui.chat.push(`${Object.keys(vehicleData.deformationMap).length} ${JSON.stringify(vehicleData.deformationMap)}`)
        if (Object.keys(vehicleData.deformationMap).length < offSetMapper.length) return vehicleActive = true
        vehicle.setBodyHealth(vehicleData.bodyHealth)
        vehicle.setEngineHealth(vehicleData.engineHealth)
        for (let i = 0; i < Object.keys(vehicleData.deformationMap).length; i++) {
            const data = vehicleData.deformationMap[i]
            const vehicleDeformation = vehicle.getDeformationAtPos(offSetMapper[data.index].x, offSetMapper[data.index].y, offSetMapper[data.index].z)
            const vehicleDefMultiInternal = (vehicleDeformation.x + vehicleDeformation.y + vehicleDeformation.z) * -10000

            if (vehicleDefMultiInternal <= 20) {
                setTimeout(() => {
                    vehicle.setDamage(offSetMapper[data.index].x, offSetMapper[data.index].y, offSetMapper[data.index].z, 200.0, (data.multiplier * 200 / 50), true);
                    setTimeout(() => vehicle.setDamage(offSetMapper[data.index].x, offSetMapper[data.index].y, offSetMapper[data.index].z, 200.0, (data.multiplier * 200 / 50), true), 50);
                    // if (data.multiplier >= 70 && data.multiplier < 140) {
                    //     vehicle.setDamage(offSetMapper[data.index].x, offSetMapper[data.index].y, offSetMapper[data.index].z, 200.0, 160.0, true);
                    // } else if (data.multiplier >= 140) {
                    //     vehicle.setDamage(offSetMapper[data.index].x, offSetMapper[data.index].y, offSetMapper[data.index].z, 200.0, 300.0, true);
                    // }
                }, 100 * i);
            }
        } vehicleActive = true
    }
})

mp.events.add("playerLeaveVehicle", () => vehicleActive = false)

setTimeout(() => {
    mp.system.notify({ title: 'Welcome to LifeExperience', text: `Enjoy the server`, attribute: 'LifeExperience', duration: 5, silent: true })
}, 8500);