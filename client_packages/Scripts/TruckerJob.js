let inJob = false
let marker = null
let busy = false
let currentStop = null
let isInStop = false
let blip = null

let trailer
let vehicle

const Main = async (vehRID, trailerID) => {
    while (true) {
        if (inJob) {
            if(!vehicle.isAttached(trailer)) {
                cancel(vehRID, trailerID)
                break
            }
            isInStop = await mp.events.callRemoteProc('job:trucker:isInStop')
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
                // mp.game.ui.setNewWaypoint(currentStop.coords.x, currentStop.coords.y)
                console.log('Go to the next point')
            }
        }
        await mp.utils.wait(5000)
    } 
}

mp.events.add('job:trucker:started', async (vehRID, trailerID) => {
    vehicle = await mp.vehicles.atRemoteId(vehRID)
    if (!vehicle) return mp.events.callRemote('job:trucker:stop')
    trailer = await mp.vehicles.atRemoteId(trailerID)
    if (!trailer) return mp.events.callRemote('job:trucker:stop')
    mp.game.graphics.notify('Get into the Truck and attach the trailer')

    if(blip) blip.destroy()
    blip = await mp.blips.new(479, new mp.Vector3(trailer.position.x, trailer.position.y, trailer.position.z), {
        name: 'Trailer',
        scale: 0.45,
        color: 12,
        alpha: 255,
        dimension: 0
    })
    blip.setRoute(true)
    blip.setRouteColour(12)
    while(true) {
        if(vehicle.isAttached(trailer)) {
            start()
            break
        }
        await mp.utils.wait(1000)
    }
})

const start = async () => {
    if (!vehicle) return mp.events.callRemote('job:trucker:stop')
    if (!trailer) return mp.events.callRemote('job:trucker:stop')

    mp.game.graphics.notify('Go to the point')

    inJob = true
    currentStop = await mp.events.callRemoteProc('job:trucker:getNextStop')
}

const cancel = () => {
    if (trailer) trailer.destroy()
    if (vehicle) vehicle.destroy()
    mp.game.graphics.notify('Job canceled')

    inJob = false
    currentStop = null
    if (marker) marker.destroy()
    marker = null
    if (blip) blip.destroy()
    blip = null
}

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
    currentStop = await mp.events.callRemoteProc('job:trucker:getNextStop')
    busy = false
})

mp.events.add('job:trucker:stopped', async () => {
    if (marker) marker.destroy()
    if (blip) blip.destroy()
    inJob = false
    marker = null
    currentStop = null
    isInStop = false
    blip = null
})

Main()