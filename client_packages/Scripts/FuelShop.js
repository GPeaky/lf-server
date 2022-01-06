let near = false
let currentPoint = null

let marker = null

const drawPoint = async (point) => {
    if (marker) marker.destroy()
    marker = await mp.markers.new(1, new mp.Vector3(point.x, point.y, point.z), 1.0, {
        color: [255, 255, 255, 255],
        visible: true,
        dimension: 0
    })
}


mp.events.add("shop:fuel:enter", ( point ) => {
    near++
    currentPoint = point
    drawPoint(point)
});

mp.events.add("shop:fuel:exit", ( ) => {
    near--
    if (marker) {
        marker.destroy()
        marker = null
    }
    currentPoint = null
});

mp.keys.bind(0x45, true, async() => {
    if (near <=0) return
    if (currentPoint == null) return
    if (mp.players.local.position.subtract(new mp.Vector3(currentPoint.x, currentPoint.y, currentPoint.z)).length() >= 2.5) return
    //Open a ui to choose the fuel
    const {pay, err} = await mp.events.callRemoteProc('shop:fuel:refuel', 25)
    if (err) {
        switch (err) {
            case 'not_in_vehicle':
                mp.game.graphics.notify('You need to be in a vehicle')
                break;
            case 'full_fuel':
                mp.game.graphics.notify('You cant fuel more than 100L')
                break;
            case 'not_enough_money':
                mp.game.graphics.notify('You dont have enough money')
                break;
        }
        return
    }

    mp.game.graphics.notify(`You have paid ${pay}$ for the 25L of fuel`)

})