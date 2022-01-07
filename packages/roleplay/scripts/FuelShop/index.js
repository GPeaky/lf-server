const FuelPoints = [
    {
        name: "Chamberlain Hill",
        blip: {
            name: "Chamberlain Hill Gas Station",
            coords:{ x: -319.61,y: -1471.46,z: 30.12 },
            sprite: 361,
            color: 29            
        },
        points: [
                {x: -331.69,y: -1473.27,z: 30.12},
                {x: -327.14,y: -1480.96,z: 30.12},
                {x: -328.19,y: -1470.64,z: 30.12},
                {x: -323.53,y: -1478.88,z: 30.12},
                {x: -323.64,y: -1468.56,z: 30.12},
                {x: -318.87,y: -1476.97,z: 30.12},
                {x: -320.7,y: -1466.83,z: 30.12},
                {x: -315.04,y: -1475.24,z: 30.12},
                {x: -316.37,y: -1463.99,z: 30.12},
                {x: -311.99,y: -1471.99,z: 30.13},
                {x: -313.17,y: -1462.6,z: 30.12},
                {x: -308.5,y: -1470.01,z: 30.12},
        ]
    },
    {
        name: "Chamberlain Hill",
        blip: {
            name: "Chamberlain Hill Gas Station",
            coords:{ x: -319.61,y: -1471.46,z: 30.12 },
            sprite: 361,
            color: 29            
        },
        points: [
                {x: -331.69,y: -1473.27,z: 30.12},
                {x: -327.14,y: -1480.96,z: 30.12},
                {x: -328.19,y: -1470.64,z: 30.12},
                {x: -323.53,y: -1478.88,z: 30.12},
                {x: -323.64,y: -1468.56,z: 30.12},
                {x: -318.87,y: -1476.97,z: 30.12},
                {x: -320.7,y: -1466.83,z: 30.12},
                {x: -315.04,y: -1475.24,z: 30.12},
                {x: -316.37,y: -1463.99,z: 30.12},
                {x: -311.99,y: -1471.99,z: 30.13},
                {x: -313.17,y: -1462.6,z: 30.12},
                {x: -308.5,y: -1470.01,z: 30.12},
        ]
    },
]

const pricePerLiter = 1.5

const Init = () => {
    FuelPoints.forEach(( { points, blip } ) => {
        new mp.core.Blips(blip)
        points.forEach(point => {
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