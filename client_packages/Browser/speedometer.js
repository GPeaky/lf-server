const speedometerBrowser = mp.browsers.new('package://Cef/Speedometer/index.html')
speedometerBrowser.active= false

mp.events.add({
    'playerEnterVehicle': (vehicle, seat) => {
        const player = mp.players.local
        if (seat == -1) {
            speedometerBrowser.active = true
            setInterval(() => {
                if (!player.vehicle) return
                const { rpm } = player.vehicle
                const velocity = player.vehicle.getSpeed() * 3.6
                const gas = player.vehicle.getPetrolTankHealth()
                speedometerBrowser.execute(`setSpeedometer(${velocity.toFixed(0)}, ${rpm * 10000}, ${gas.toFixed(0)})`)
            }, 100)
        }
    },

    'playerLeavedVehicle': () => {
        speedometerBrowser.active= false
    }
})