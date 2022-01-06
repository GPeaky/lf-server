let inJob = false
let marker = null
let busy = false
let currentStop = null
let isInStop = false
let blip = null

const Main = async () => {
    while (true) {
        if (inJob) {
            isInStop = await mp.events.callRemoteProc('job:bus:isInStop')
            if (isInStop) {
                if (!marker) {
                    marker = mp.markers.new(20, new mp.Vector3(currentStop.coords.x, currentStop.coords.y, currentStop.coords.z + 3), 2.0, {
                        color: [255, 255, 255, 255],
                        visible: true,
                        dimension: 0
                    })
                }
            } else {
                if(blip) blip.destroy()
                blip = await mp.blips.new(1, new mp.Vector3(currentStop.coords.x, currentStop.coords.y, currentStop.coords.z), {
                    name: 'Point',
                    scale: 0.45,
                    color: 12,
                    alpha: 255,
                    dimension: 0
                })
                blip.setRoute(true)
                blip.setRouteColour(12)
                console.log('Go to the next point')
            }
        }
        await mp.utils.wait(5000)
    } 
}

mp.events.add('job:bus:started', async (vehRID) => {
    const vehicle = await mp.vehicles.atRemoteId(vehRID)
    if (!vehicle) return mp.events.callRemote('job:bus:stop')
    mp.game.graphics.notify('Get into the Bus')
    inJob = true
    currentStop = await mp.events.callRemoteProc('job:bus:getNextStop')
})

mp.keys.bind(0x45, true, async() => {
    if (!inJob) return
    if (busy) return
    if (!isInStop) return 
    if (mp.players.local.vehicle.position.subtract(new mp.Vector3(currentStop.coords.x, currentStop.coords.y, currentStop.coords.z)).length() >= 5.5) return
    mp.players.local.vehicle.freezePosition(true)
    busy = true
    await mp.utils.wait(2600)
    mp.players.local.vehicle.freezePosition(false)
    marker.destroy()
    marker = null
    currentStop = await mp.events.callRemoteProc('job:bus:getNextStop')
    busy = false
})

mp.events.add('job:bus:stopped', async () => {
    if (marker) marker.destroy()
    if (blip) blip.destroy()
    inJob = false
    marker = null
    currentStop = null
    isInStop = false
    blip = null
})

Main()