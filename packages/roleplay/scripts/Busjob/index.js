// 451.11 , -629.23 , 28.54 , 86.74

const startSettings = {
    x: 451.11 ,
    y: -629.23,
    z: 28.54,
    dimension: 0,
}

// 460.67 , -625.89 , 28.5 , 213.97

const vehicleSettings = {
    x: 460.67 ,
    y: -625.89,
    z: 28.5,
    h: 213.97,
    dimension: 0,
}

const stops = [
    //307.08 , -763.35 , 29.2 , 161.02
    {
        name: "Textile City",
        coords: {x: 307.08, y: -763.35, z: 29.2, h: 161.02},
    },
    //-108.31 , -1688.15 , 29.23 , 140.41
    {
        name: "Chamberlain Hill",
        coords: {x: -108.31, y: -1688.15, z: 29.23, h: 140.41},
    },
    //-244.82 , -711.32 , 33.42 , 160.99
    {
        name: "Pillbox Hill",
        coords: {x: -244.82, y: 711.32, z: 33.42, h: 160.99},
    },
    //-1527.88 , -467.57 , 35.3 , 302.49
    {
        name: "Del Perro",
        coords: {x: -1527.88, y: -467.57, z: 35.3, h: 302.49},
    },
    //-693.1 , -6.12 , 38.13 , 110.26
    {
        name: "Rockford Hills",
        coords: {x: -693.1, y: -6.12, z: 38.13, h: 110.26},
    },
    //-644.61 , -140.94 , 37.69 , 30.41
    {
        name: "Rockford Hills",
        coords: {x: -644.61, y: -140.94, z: 37.69, h: 30.41},
    },
    //-505.58 , -668.24 , 32.99 , 271.01
    {
        name: "Little Seoul",
        coords: {x: -505.58, y: -668.24, z: 32.99, h: 271.01},
    },
    //117.24 , -784.71 , 31.27 , 69.53
    {
        name: "Pillbox Hill",
        coords: {x: 117.24, y: -784.71, z: 31.27, h: 69.53},
    },
    //264.91 , -1216.5 , 29.36 , 269.93
    {
        name: "Strawberry Avenue",
        coords: {x: 264.91, y: -1216.5, z: 29.36, h: 269.93},
    },
    //354 , -1065.14 , 29.41 , 270.42
    {
        name: "Mission Row",
        coords: {x: 354, y: -1065.14, z: 29.41, h: 270.42},
    },
]

const working = {}

// setInterval(() => {
//     console.log(working)
// }, 1000);

const createVehicle = async player => {
    const veh = await mp.vehicles.new(mp.joaat('bus'), new mp.Vector3(vehicleSettings.x, vehicleSettings.y, vehicleSettings.z),
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
        jobName: 'bus',
        playerIdentifier: player.shared.identifier,
    }
    working[player.shared.identifier].jobVehID = veh.id
    player.call('job:bus:started', [veh.id])
}

const stopBusJob = async (player) => {
    if (player.vehicle && player.vehicle.job?.jobName == 'bus' && player.vehicle.job?.playerIdentifier == player.shared.identifier) {
        player.vehicle.job = null
        player.vehicle.destroy()
        player.call('job:bus:stopped')
        player.notify('You have stopped the bus job.')
        delete working[player.shared.identifier]
    } else {
        delete working[player.shared.identifier]
        player.call('job:bus:stopped')
        player.notify('You have stopped the bus job.')
        mp.vehicles.forEach(vehicle => {
            if (vehicle.job?.jobName == 'bus' && vehicle.job?.playerIdentifier == player.shared.identifier) vehicle.destroy()
        })
    }
}

const Init = async ()  => {
    const startPointLabel = new mp.core.Label("[Bus Job] Press ~y~E~s~ Start / Stop", new mp.Vector3(startSettings.x , startSettings.y , startSettings.z+1),
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
                    stopCount: 0,
                    jobVehID: null,
                    seconds: 0
                }
            } else stopBusJob(player)
        }
    });

    const startPointMarker = mp.markers.new(1, new mp.Vector3(startSettings.x, startSettings.y, startSettings.z - 1.5), 1.5,
        {
            direction: new mp.Vector3(-418.74 , -1708.96 , 19.4),
            rotation: 0,
            color: [255, 255, 255, 255],
            visible: true,
            dimension: startSettings.dimension
        }
    )
}

mp.events.add('job:bus:stop', stopBusJob)

mp.events.addProc('job:bus:getNextStop', async player => {
    if (working[player.shared.identifier]) {
        if (working[player.shared.identifier].stopCount == 0) {
            working[player.shared.identifier].stopCount++
            return stops[0]
        }// All the players will go to the first stop first
        const currentPlayerStop = working[player.shared.identifier].currentStop
        while (currentPlayerStop == working[player.shared.identifier].currentStop) {
            working[player.shared.identifier].currentStop = Math.floor(Math.random() * stops.length)
        }
        // console.log(`Next stop for ${player.name} is ${stops[working[player.shared.identifier].currentStop].name}`)
        working[player.shared.identifier].stopCount++
        return stops[working[player.shared.identifier].currentStop]
    } else return null
})

mp.events.addProc('job:bus:isInStop', async player => {
    if (working[player.shared.identifier]) {
        const playerStop = stops[working[player.shared.identifier].currentStop]
        const jobVehicle = mp.vehicles.at(working[player.shared.identifier].jobVehID)
        if (jobVehicle?.dist(playerStop.coords) <= 35) return true
        return false
    } else return null
})

Init()