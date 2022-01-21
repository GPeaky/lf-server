let vehiclesRented = 0

const RentPoints = [
    {
        name: "Chamberlain Hill",
        blip: {
            name: "Chamberlain Hill Vehicle Rent",
            coords: {x: -49.59, y: -1684.29, z: 29.48},
            sprite: 225,
            color: 29            
        },
        //-40.62 , -1674.55 , 29.48
        menu: {x: -40.62, y: -1674.55, z: 29.48},
        vehicles: [
            //-52.55 , -1677.31 , 29.19 , 232.82
            { model: ["blista"],       price: [2500],       x: -52.55, y: -1677.31,z: 29.19, heading: 232.82 },
            //-54.88 , -1680.3 , 29.29 , 233.1
            { model: ["asbo", "club"], price: [1250, 2750], x: -54.88, y: -1680.3, z: 29.29, heading: 233.1 },
        ]
    }
]

//Cambiar a camaras en vez de punto cuando este bien hecho el defaul_menu

const GetRandomColor = () => {
    const col = Math.floor(Math.random() * 200)
    const col2 = Math.floor(col - Math.random() * 100)
    return [[
        Math.floor(col + 55),
        Math.floor(col + 55),
        Math.floor(col + 55)
    ],[
        Math.floor(col2 + 55),
        Math.floor(col2 + 55),
        Math.floor(col2 + 55)
    ]]
}

const RespawnVeh = async(index2, index) => {
    let point = RentPoints[index2].vehicles[index]
    point.vehicle = mp.vehicles.new(point.model, new mp.Vector3(point.x, point.y, point.z), {
        heading: point.heading,
        numberPlate: `RENT${vehiclesRented}`,
        color: GetRandomColor(),
    })
    point.vehicle.exposition = true
    point.vehicle.rented = true
    vehiclesRented++ 
    point.used = false
    
    RentPoints[index2].vehicles[index] = point
}

const Init = () => {
    RentPoints.forEach(({ menu, vehicles, blip }, index2 ) => {
        new mp.core.Blips(blip)
        
        vehicles.forEach((point, index) => {
            let randomNum
            if(point.model.length > 1) {
                randomNum = Math.floor(Math.random() * point.model.length)
                point.model = point.model[randomNum]
                point.price = point.price[randomNum]
                RentPoints[index2].vehicles[index].model = point.model
                RentPoints[index2].vehicles[index].price = point.price
            }

            point.index2 = index2
            point.index = index
                

            point.vehicle = mp.vehicles.new(point.model, new mp.Vector3(point.x, point.y, point.z), {
                heading: point.heading,
                numberPlate: `RENT${vehiclesRented}`,
                color: GetRandomColor()
            })
            point.vehicle.exposition = true
            point.vehicle.rented = true
            vehiclesRented++ 
            point.used = false

            RentPoints[index2].vehicles[index].vehicle = point.vehicle

            const colshape = mp.colshapes.newRectangle(point.x, point.y, 3, 3, 0)
        
            function playerEnterColshapeHandler(player, shape) {
                if(shape == colshape && RentPoints[index2].vehicles[index].used == false) {
                    player.call("shop:rent:enter", [RentPoints[index2].vehicles[index]])
                }
            }
            
            mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

            
            function playerExitColshapeHandler(player, shape) {
                if(shape == colshape) {
                    player.call("shop:rent:exit", [RentPoints[index2].vehicles[index]])
                }
            }

            mp.events.add("playerExitColshape", playerExitColshapeHandler);
        })
    })
}

mp.events.addProc("shop:rent:rentveh", (player, data) => {
    const {price, index2, index} = JSON.parse(data)
    const {vehicle} = RentPoints[index2].vehicles[index]
    RentPoints[index2].vehicles[index].used = true
    RentPoints[index2].vehicles[index].vehicle.exposition = undefined
    vehicle.engine = true
    //TODO: Check if player has enough money
    // const playerMoney = 99999
    // if(price > playerMoney) return {err: 'not_enough_money'}
    
    //TODO: Select the quantity of time
    const time = 0.1 //minutes

    setTimeout(() => { 
        RentPoints[index2].vehicles[index].used = false
        RentPoints[index2].vehicles[index].vehicle.rented = false
        player.call("shop:rent:timeFinished", [vehicle])  
        RespawnVeh(index2, index)
    },time * 1000 * 60)

    return {pay: price, time}
});

Init()