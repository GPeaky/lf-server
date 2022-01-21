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

mp.events.add("shop:rent:timeFinished", (vehicle) => {
    vehicle.setUndriveable(true)
    mp.game.graphics.notify("You exceeded the time limit, now the vehicle is locked electronically")    
});

mp.events.add("shop:rent:enter", ( point ) => {
    currentPoint = point
    drawPoint(point)
});

mp.events.add("shop:rent:exit", ( ) => {
    if (marker) {
        marker.destroy()
        marker = null
    }
    currentPoint = null
});

mp.keys.bind(0x45, true, async() => {
    if (currentPoint == null) return console.log(1)
    if (mp.players.local.position.subtract(new mp.Vector3(currentPoint.x, currentPoint.y, currentPoint.z)).length() >= 5.5) return console.log(2)
    const data = {price: currentPoint.price, index: currentPoint.index, index2: currentPoint.index2}
    
    mp.events.call('shop:rent:exit')
    const {pay,time} = await mp.events.callRemoteProc('shop:rent:rentveh', JSON.stringify(data))
    
    mp.game.graphics.notify(`You have paid ${pay}$ for ${time} minutes of rent`)
})