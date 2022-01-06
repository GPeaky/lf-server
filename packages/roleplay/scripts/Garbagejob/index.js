// -418.74 , -1708.96 , 19.4 , 357.31

const startSettings = {
    x: -418.74 ,
    y: -1708.96,
    z: 19.4,
    dimension: 0,
}

//-427.11 , -1717.8 , 19.27 , 282.67
const vehicleSettings = {
    x: -427.11 ,
    y: -1717.8,
    z: 19.27,
    h: 282.67,
    dimension: 0,
}

const blip = {
    name: "Garbage Center",
    coords:{ x: -418.74 , y: -1708.96, z: 19.4 },
    sprite: 318,
    color: 12            
}

const stops = [
    {
        name: "Forum",
        coords: {x: -168.07, y: -1662.8, z: 33.31, h: 137.5},
    },
    {
        name: "Grove",
        coords: {x: 118.06, y: -1943.96, z: 20.43, h: 179.5},
    },
    {
        name: "James Town",
        coords: {x: 297.94, y: -2018.26, z: 20.49, h: 119.5},
    },
    {
        name: "Roy Lowen",
        coords: {x: 509.99, y: -1620.98, z: 29.09, h: 0.5},
    },
    {
        name: "LB Hovercraft",
        coords: {x: 488.49, y: -1284.1, z: 29.24, h: 138.5},
    },
    {
        name: "Vespucci",
        coords: {x: 307.47, y: -1033.6, z: 29.03, h: 46.5},
    },
    {
        name: "Elgina Avenue",
        coords: {x: 239.19, y: -681.5, z: 37.15, h: 178.5},
    },
    {
        name: "Elgina Avenue 2",
        coords: {x: 543.51, y: -204.41, z: 54.16, h: 199.5},
    },
    {
        name: "Power Street",
        coords: {x: 268.72, y: -25.92, z: 73.36, h: 90.5},
    },
    {
        name: "Alta Street",
        coords: {x: 267.03, y: 276.01, z: 105.54, h: 332.5},
    },
    {
        name: "Didion Drive",
        coords: {x: 21.65, y: 375.44, z: 112.67, h: 323.5},
    },
    {
        name: "Milton Road",
        coords: {x: -546.9, y: 286.57, z: 82.85, h: 127.5},
    },
    {
        name: "East Bourne Way",
        coords: {x: -683.23, y: -169.62, z: 37.74, h: 267.5},
    },
    {
        name: "East Bourne Way 2",
        coords: {x: -771.02, y: -218.06, z: 37.05, h: 277.5},
    },
    {
        name: "Industry Passage",
        coords: {x: -1057.06, y: -515.45, z: 35.83, h: 61.5},
    },
    {
        name: "Boulevar Del Perro",
        coords: {x: -1558.64, y: -478.22, z: 35.18, h: 179.5},
    },
    {
        name: "Sand Casttle",
        coords: {x: -1350.0, y: -895.64, z: 13.36, h: 17.5},
    },
    {
        name: "Magell Avenue",
        coords: {x: -1243.73, y: -1359.72, z: 3.93, h: 287.5},
    },
    {
        name: "Palomino Avenue",
        coords: {x: -845.87, y: -1113.07, z: 6.91, h: 253.5},
    },
    {
        name: "South Rock Drive",
        coords: {x: -635.21, y: -1226.45, z: 11.8, h: 143.5},
    },
    {
        name: "South Arenal Street",
        coords: {x: -587.74, y: -1739.13, z: 22.47, h: 339.5},
    },
    {
        name: "Textile City",
        coords: {x: 448.57, y: -574.37, z: 28.5, h: 298.5},
    }
]

const working = {}

// setInterval(() => {
//     console.log(working)
// }, 1000);

const createVehicle = async player => {
    const veh = await mp.vehicles.new(mp.joaat('biff'), new mp.Vector3(vehicleSettings.x, vehicleSettings.y, vehicleSettings.z),
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
        jobName: 'garbage',
        playerIdentifier: player.shared.identifier,
    }
    working[player.shared.identifier].jobVehID = veh.id
    player.call('job:garbage:started', [veh.id])
}

const stopGarbageJob = async (player) => {
    if (player.vehicle && player.vehicle.job?.jobName == 'garbage' && player.vehicle.job?.playerIdentifier == player.shared.identifier) {
        player.vehicle.job = null
        player.vehicle.destroy()
        player.call('job:garbage:stopped')
        player.notify('You have stopped the garbage job.')
        delete working[player.shared.identifier]
    } else {
        delete working[player.shared.identifier]
        player.call('job:garbage:stopped')
        player.notify('You have stopped the garbage job.')
        mp.vehicles.forEach(vehicle => {
            if (vehicle.job?.jobName == 'garbage' && vehicle.job?.playerIdentifier == player.shared.identifier) vehicle.destroy()
        })
    }
}

const Init = async ()  => {
    new mp.core.Blips(blip)

    const startPointLabel = new mp.core.Label("[Garbage Job] Press ~y~E~s~ Start / Stop", new mp.Vector3(-418.74 , -1708.96 , 19.4),
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
            } else stopGarbageJob(player)
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

mp.events.add('job:garbage:stop', stopGarbageJob)

mp.events.addProc('job:garbage:getNextStop', async player => {
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

mp.events.addProc('job:garbage:isInStop', async player => {
    if (working[player.shared.identifier]) {
        const playerStop = stops[working[player.shared.identifier].currentStop]
        const jobVehicle = mp.vehicles.at(working[player.shared.identifier].jobVehID)
        if (jobVehicle?.dist(playerStop.coords) <= 25) return true
        return false
    } else return null
})

Init()