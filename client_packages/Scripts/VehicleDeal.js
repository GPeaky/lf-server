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


mp.events.add("VehicleDeal:enter", ( point ) => {
    near++
    currentPoint = point
    drawPoint(point)
});

mp.events.add("VehicleDeal:exit", ( ) => {
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
    if (mp.players.local.position.subtract(new mp.Vector3(currentPoint.menu.x, currentPoint.menu.y, currentPoint.menu.z)).length() >= 2.5) return
    
    mp.events.callRemote('shop:VehicleDeal:action', [currentPoint]);

})