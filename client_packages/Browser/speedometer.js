let speedInterval = null
const player = mp.players.local
const browser = mp.browsers.new('package://Cef/Speedometer/index.html')
browser.active= false

mp.events.add({
    'playerEnterVehicle': (_vehicle, seat) => {
        if (seat == -1) {
            browser.active = true
            speedInterval = setInterval(() => {
                if (!player.vehicle) return
                const { rpm, gear } = player.vehicle
                const speed = player.vehicle.getSpeed() * 3.6
    
                browser.call('speedometer::update', (rpm * 10000).toFixed(0), speed.toFixed(0), gear)
            }, 1) 
        }
    },

    'playerLeaveVehicle': () => {
        if (speedInterval) clearInterval(speedInterval)
        browser.active= false
    }
})