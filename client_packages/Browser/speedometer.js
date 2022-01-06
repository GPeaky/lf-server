const speedometerBrowser = mp.browsers.new('package://Cef/Speedometer/index.html')
let speedInterval = null
let rpmInterval = null
speedometerBrowser.active= false

function playerEnterVehicleHandler(vehicle, seat) {
    const player = mp.players.local
    if (seat == -1) {
        speedometerBrowser.active = true
        speedInterval = setInterval(() => {
            if (!player.vehicle) return
            const velocity = player.vehicle.getSpeed() * 3.6
            const gas = player.vehicle.getPetrolTankHealth()
            const rpm = player.vehicle.rpm
            speedometerBrowser.execute(`setSpeedometer(${velocity.toFixed(0)}, ${rpm * 10000}, ${gas.toFixed(0)})`)
        }, 100)
    }
}

function playerLeavedVehicleHandler(vehicle, seat){
    if (speedInterval) clearInterval(speedInterval)
    if (rpmInterval) clearInterval(rpmInterval)
    speedometerBrowser.active= false
}

mp.events.add("playerEnterVehicle", playerEnterVehicleHandler)
mp.events.add("playerLeaveVehicle", playerLeavedVehicleHandler)