const FuelPoints = [
    {
        name: "Chamberlain Hill",
        blip: {
            coords:{ x: -319.61,y: -1471.46,z: 30.12 },
            sprite: 361,
            color: 29            
        },
        points: [
            //-331.69 , -1473.27 , 30.12 , 210.51
            {x: -331.69,y: -1473.27,z: 30.12},
            //-327.14 , -1480.96 , 30.12 , 210.57
            {x: -327.14,y: -1480.96,z: 30.12},
            //-328.19 , -1470.64 , 30.12 , 209.51
            {x: -328.19,y: -1470.64,z: 30.12},
            //-323.53 , -1478.88 , 30.12 , 209.45
            {x: -323.53,y: -1478.88,z: 30.12},
            //-323.64 , -1468.56 , 30.12 , 210.23
            {x: -323.64,y: -1468.56,z: 30.12},
            //-318.87 , -1476.97 , 30.12 , 209.5
            {x: -318.87,y: -1476.97,z: 30.12},
            //-320.7 , -1466.83 , 30.12 , 210.52
            {x: -320.7,y: -1466.83,z: 30.12},
            //-315.04 , -1475.24 , 30.12 , 209.48
            {x: -315.04,y: -1475.24,z: 30.12},
            //-316.37 , -1463.99 , 30.12 , 208.55
            {x: -316.37,y: -1463.99,z: 30.12},
            //-311.99 , -1471.99 , 30.13 , 208.64
            {x: -311.99,y: -1471.99,z: 30.13},
            //-313.17 , -1462.6 , 30.12 , 209.43
            {x: -313.17,y: -1462.6,z: 30.12},
            //-308.5 , -1470.01 , 30.12 , 209.47
            {x: -308.5,y: -1470.01,z: 30.12},
            //-309.72 , -1460.71 , 30.12 , 208.55
        ]
    },
]

const pricePerLiter = 1.5

const Init = () => {
    //TODO: Send blip to the blip system

    //TODO: Make colshape and keys
    FuelPoints.forEach(pointer => {
        pointer.points.forEach(point => {
            const colshape = mp.colshapes.newRectangle(point.x, point.y, 3, 3, 0)
        
            function playerEnterColshapeHandler(player, shape) {
                if(shape == colshape) {
                    player.call("shop:fuel:enter", [point])
                }
            }
            
            mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

            
            function playerExitColshapeHandler(player, shape) {
                if(shape == colshape) {
                    player.call("shop:fuel:exit", [point])
                }
            }
            
            mp.events.add("playerExitColshape", playerExitColshapeHandler);
        })
    })
}

mp.events.addProc("shop:fuel:refuel", (player, fuel) => {
    console.log(player.vehicle.fuel)
    const {vehicle} = player
    if(vehicle == null) return {err: 'not_in_vehicle'}

    //TODO: Check if player has enough money
    const toPay = fuel * pricePerLiter
    const playerMoney = 99999
    if(toPay > playerMoney) return {err: 'not_enough_money'}

    if (vehicle.fuel + fuel > 100) return {err: 'full_fuel'}

    vehicle.fuel += fuel
    return {pay: toPay}
});

Init()