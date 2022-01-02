// -418.74 , -1708.96 , 19.4 , 357.31

const startSettings = {
    x: -418.74 ,
    y: -1708.96,
    z: 19.4,
    dimension: 0,
}

const working = {}

const createVehicle = async player => {
    const veh = await mp.vehicles.new(mp.joaat('biff'), new mp.Vector3(startSettings.x, startSettings.y, startSettings.z),
    {
        heading: 357.31,
        numberPlate: "GBJB",
        alpha: 255,
        color: [[0, 0, 0], [0, 0, 0]],
        locked: false,
        engine: false,
        dimension: 0
    });
    player.call('job:garbage:started', [veh.id])
}

const Init = async ()  => {
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
            if (!working[player.identifier]) {
                createVehicle(player)
                working[player.identifier] = true
            } else player.notify('You are already working')
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

Init()