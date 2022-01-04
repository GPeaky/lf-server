let inJob = false
let marker = null
let busy = false
let currentStop = null
let isInStop = false
let blip = null

const Main = async () => {
    while (true) {
        if (inJob) {
            isInStop = await mp.events.callRemoteProc('job:garbage:isInStop')
            if (isInStop) {
                if (!marker) {
                    marker = mp.markers.new(20, new mp.Vector3(currentStop.coords.x, currentStop.coords.y, currentStop.coords.z), 1.0, {
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

mp.events.add('job:garbage:started', async (vehRID) => {
    const vehicle = await mp.vehicles.atRemoteId(vehRID)
    if (!vehicle) return mp.events.callRemote('job:garbage:stop')
    mp.game.graphics.notify('Get into the garbage truck')
    inJob = true
    currentStop = await mp.events.callRemoteProc('job:garbage:getNextStop')
})

mp.keys.bind(0x45, true, async() => {
    if (!inJob) return
    if (busy) return
    if (!isInStop) return 
    if (mp.players.local.position.subtract(new mp.Vector3(currentStop.coords.x, currentStop.coords.y, currentStop.coords.z)).length() >= 1.5) return
    mp.game.streaming.requestAnimDict("anim@move_m@trash");//preload the animation
    mp.players.local.taskPlayAnim("anim@move_m@trash", "pickup", 8.0, 1.0, 2300, 1, 1.0, false, false, false);
    busy = true
    await mp.utils.wait(2600)
    marker.destroy()
    marker = null
    currentStop = await mp.events.callRemoteProc('job:garbage:getNextStop')
    busy = false
})

mp.events.add('job:garbage:stopped', async () => {
    if (marker) marker.destroy()
    if (blip) blip.destroy()
    inJob = false
    marker = null
    currentStop = null
    isInStop = false
    blip = null
})

Main()