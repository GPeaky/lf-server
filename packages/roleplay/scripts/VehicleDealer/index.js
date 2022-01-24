const VehicleDealPoints = [
    {
        name: "Chamberlain Hill Car Dealer",
        blip: {
            name: "Chamberlain Hill Car Dealer",
            coords:{ x: -319.61,y: -1471.46,z: 30.12 },
            sprite: 810,
            color: 29            
        },
        menu: new mp.Vector3(0,0,0),
        vehiclePoint: {
            coords: {
                x:0,
                y:0,
                z:0
            },
            heading: 0
        },
        vehicles: [
            {name:'t20', label:'Macaren P1', description:'Velocity: 120Km/h\nKilometers: 0Km', price:3500}
        ]
    }
]

const Init = () => {
    VehicleDealPoints.forEach(( point, index ) => {
        const { menu, blip } = point
        new mp.core.Blips(blip)

        const colshape = mp.colshapes.newRectangle(menu.x, menu.y, 3, 3, 0)
        
        function playerEnterColshapeHandler(player, shape) {
            if(shape == colshape) {
                player.call("shop:VehicleDeal:enter", [{index,menu}])
            }
        }
        
        mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

        
        function playerExitColshapeHandler(player, shape) {
            if(shape == colshape) {
                player.call("shop:VehicleDeal:exit", [{index,menu}])
            }
        }
        
        mp.events.add("playerExitColshape", playerExitColshapeHandler);
    })
}

mp.events.add("shop:VehicleDeal:action", async (player, {index}) => {
    // TODO (Menus) player.closeAllMenus()
    //* const menuData = VehicleDealPoints[index].vehicles
    // TODO Add the posibility of the colors
    //* const menu = await player.openMenu(menuData)
    
    //* menu.onAccept((option) => {
    //*     if(option.price > player.balance) return {status:false, err:'You need more money to pay this'}
    
            //TODO: Recibe the vehicle and set the color
    //*     player.spawnVehicle(option.name, new mp.Vector3(option.vehiclePoint.coords.x, option.vehiclePoint.coords.y + 3.0, option.vehiclePoint.coords.z), option.vehiclePoint.heading)

    //*     return {status:true}
    //* })
})

Init()