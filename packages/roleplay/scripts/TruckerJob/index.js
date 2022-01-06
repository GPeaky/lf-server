// 871.42 , -1146.07 , 25.99 , 265.26

const startSettings = {
    x: 871.42,
    y: -1146.07,
    z: 25.99,
    dimension: 0,
}

// 862.42 , -1146.51 , 24.47 , 181.91
const vehicleSettings = {
    x: 862.42,
    y: -1146.51,
    z: 24.47,
    h: 181.91,
    dimension: 0,
}

//841.81 , -1155.44 , 25.26 , 271.01
const trailerSettings = {
    x: 841.81,
    y: -1155.44,
    z: 25.26,
    h: 271.01,
    dimension: 0,
}

const blip = {
    name: "Trucker Center",
    coords:{ x: 871.42, y: -1146.07, z: 25.99 },
    sprite: 318,
    color: 12            
}

const centralStop = {
    name: "Central Stop",
    coords: { x: 861.69, y: -1166.93, z: 25.27 },
}

const stops = [
    {
        name: "Textile City",
        coords: {x: 448.57, y: -574.37, z: 28.5, h: 298.5},
    }
]

const working = {}

const createTrailer = async (player, vehid) => {
    let sended = false
    const trailer = await mp.vehicles.new(mp.joaat('trailers2'), new mp.Vector3(trailerSettings.x, trailerSettings.y, trailerSettings.z),
    {
        heading: trailerSettings.h,
        numberPlate: "GBJB",
        alpha: 255,
        color: [[0, 0, 0], [0, 0, 0]],
        locked: false,
        engine: false,
        dimension: 0
    });
    trailer.job = {
        jobName: 'trucker',
        playerIdentifier: player.shared.identifier,
    }
    working[player.shared.identifier].jobTrailerID = trailer.id
    player.call('job:trucker:started', [vehid, trailer.id])

    mp.events.add('trailerAttached', (vehicle, trailer) => {
        console.log('trailerAttached')
        if(vehicle == vehid && trailer == trailer.id && !sended) {
            sended = true
            player.call('job:trucker:start', [vehicle.id, trailer.id])
        }
    });

    mp.events.add('VehicleTrailerChange', (vehicle, trailer) => {
        console.log("VehicleTrailerChange")
        if(vehicle == vehid && trailer == trailer.id && sended) {
            player.call('job:trucker:cancel', [vehicle.id, trailer.id])
        }
    })
}

const createVehicle = async player => {
    const veh = await mp.vehicles.new(mp.joaat('hauler'), new mp.Vector3(vehicleSettings.x, vehicleSettings.y, vehicleSettings.z),
    {
        heading: vehicleSettings.h,
        numberPlate: "GBJB",
        alpha: 255,
        color: [[0, 0, 0], [0, 0, 0]],
        locked: false,
        engine: false,
        dimension: 0
    });
    veh.job = {
        jobName: 'trucker',
        playerIdentifier: player.shared.identifier,
    }
    working[player.shared.identifier].jobVehID = veh.id
    createTrailer(player, veh.id)
}

const stopTruckerJob = async (player) => {
    if (player.vehicle && player.vehicle.job?.jobName == 'trucker' && player.vehicle.job?.playerIdentifier == player.shared.identifier) {
        player.vehicle.job = null
        player.vehicle.destroy()
        player.call('job:trucker:stopped')
        player.notify('You have stopped the trucker job.')
        delete working[player.shared.identifier]
    } else {
        delete working[player.shared.identifier]
        player.call('job:trucker:stopped')
        player.notify('You have stopped the trucker job.')
        mp.vehicles.forEach(vehicle => {
            if (vehicle.job?.jobName == 'trucker' && vehicle.job?.playerIdentifier == player.shared.identifier) vehicle.destroy()
        })
    }
}

const Init = async ()  => {
    new mp.core.Blips(blip)

    const startPointLabel = new mp.core.Label("[Trucker Job] Press ~y~E~s~ Start / Stop", new mp.Vector3(-418.74 , -1708.96 , 19.4),
    {
        los: false,
        font: 2,
        drawDistance: 10,
        dimension: startSettings.dimension
    },
    {
        key: 0x45,
        coords: {x: startSettings.x, y: startSettings.y, z: startSettings.z, width: 5.0, height: 5.0, dimension: startSettings.dimension},
        callback: async player => {
            if (!working[player.shared.identifier]) {
                createVehicle(player)
                working[player.shared.identifier] = {
                    currentStop: 0,
                    needsToReturn: false,
                    stopCount: 0,
                    jobVehID: null,
                    seconds: 0
                }
            } else stopTruckerJob(player)
        }
    });

    const startPointMarker = mp.markers.new(1, new mp.Vector3(startSettings.x, startSettings.y, startSettings.z - 1.5), 1.5,
        {
            direction: new mp.Vector3(startSettings.x, startSettings.y, startSettings.z),
            rotation: 0,
            color: [255, 255, 255, 255],
            visible: true,
            dimension: startSettings.dimension
        }
    )
}

mp.events.add('job:trucker:stop', stopTruckerJob)

mp.events.addProc('job:trucker:getNextStop', async player => {
    if (working[player.shared.identifier]) {
        
        const currentPlayerStop = working[player.shared.identifier].currentStop
        while (currentPlayerStop == working[player.shared.identifier].currentStop) {
            working[player.shared.identifier].currentStop = Math.floor(Math.random() * stops.length)
        }

        if(working[player.shared.identifier].needsToReturn) {
            working[player.shared.identifier].needsToReturn = false
            return centralStop
        }

        working[player.shared.identifier].needsToReturn = true
        working[player.shared.identifier].stopCount++
        return stops[working[player.shared.identifier].currentStop]
    } else return null
})

mp.events.addProc('job:trucker:isInStop', async player => {
    if (working[player.shared.identifier]) {
        const playerStop = stops[working[player.shared.identifier].currentStop]
        const jobVehicle = mp.vehicles.at(working[player.shared.identifier].jobVehID)
        if (jobVehicle?.dist(playerStop.coords) <= 25) return true
        return false
    } else return null
})

Init()