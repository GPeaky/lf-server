let playersViwing = {}

const VehicleDealPoints = [
    {
        name: "Chamberlain Hill Car Dealer",
        blip: {
            name: "Chamberlain Hill Car Dealer",
            // -44.1 , -1097.34 , 26.42 , 240.7
            coords:{ x: -44.1, y: -1097.34, z: 26.42 },
            sprite: 810,
            color: 29            
        },
        menu: new mp.Vector3(-50.11, -1088.96, 26.42),
        vehiclePoint: {
            //-29.97 , -1087.12 , 25.81 , 340.21
            coords: { x: -29.97, y: -1087.12, z: 25.81 },
            heading: 340.21
        },
        vehiclePreview: {
            //-42.97 , -1098.9 , 25.73 , 283.98
            coords: { x: -42.97, y: -1098.9, z: 25.73 },
            heading: 283.98
        },
        vehicles: [
            {name:'t20', label:'Macaren P1', options:{
                'Velocity': '120Km/h',
                'Kilometers': '0Km'
            }, price:3500},
            {name:'blista', label:'F1 Fernando A.', options:{
                'Velocity': '230Km/h',
                'Kilometers': '0Km'
            }, price:3500}
        ]
    }
]

const Init = () => {
    VehicleDealPoints.forEach(( point, index ) => {
        const { menu, blip, vehicles } = point
        new mp.core.Blips(blip)

        const colshape = mp.colshapes.newRectangle(menu.x, menu.y, 3, 3, 0)
        
        function playerEnterColshapeHandler(player, shape) {
            if(shape == colshape) {
                console.log("A")
                player.call("shop:VehicleDeal:enter", [{index,menu, vehicles}])
            }
        }
        
        mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

        
        function playerExitColshapeHandler(player, shape) {
            if(shape == colshape) {
                console.log("B")
                player.call("shop:VehicleDeal:exit", [{index,menu}])
            }
        }
        
        mp.events.add("playerExitColshape", playerExitColshapeHandler);
    })
}

const PreviewVehicle = (model, {coords, heading}, player) => {
    const veh = mp.vehicles.new(mp.joaat(model), new mp.Vector3(coords.x, coords.y, coords.z), {
            heading: heading,
            numberPlate: "LS482",
            alpha: 255,
            color: [[12, 12, 12], [12, 12, 12]],
            locked: true,
            engine: false,
            dimension: player.id + 112
        });
    setTimeout( () => {
        veh.exposition = true
        try {
            player.putIntoVehicle(veh, 0);            
        } catch (error) {
            return            
        }
    }, 200);
    return veh
}

mp.events.add("shop:VehicleDeal:startPreview", (player, model) => {
    console.log(model)
    player.dimension = player.id + 112
    playersViwing[player.id] = PreviewVehicle(model, VehicleDealPoints[0].vehiclePreview, player)
})

mp.events.add("shop:VehicleDeal:stopPreview", (player) => {
    playersViwing[player.id].destroy()
    playersViwing[player.id] = undefined
    player.dimension = 0
    player.position = new mp.Vector3(VehicleDealPoints[0].menu.x, VehicleDealPoints[0].menu.y, VehicleDealPoints[0].menu.z)    
})

mp.events.add("shop:VehicleDeal:updatePreview", (player, model) => {
    player.dimension = player.id + 112
    playersViwing[player.id].destroy()
    playersViwing[player.id] = PreviewVehicle(model, VehicleDealPoints[0].vehiclePreview, player)
})

mp.events.add("shop:VehicleDeal:action", async (player, option) => {
    const data = JSON.parse(option)
})

Init()