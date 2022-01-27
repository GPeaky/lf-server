let near = false
let currentPoint = null

let marker = null

let menuOpened = false

const drawPoint = async (point) => {
    if (marker) marker.destroy()
    marker = await mp.markers.new(1, new mp.Vector3(point.menu.x, point.menu.y, point.menu.z), 1.0, {
        color: [255, 255, 255, 255],
        visible: true,
        dimension: 0
    })
}

mp.events.add("university:enter", ( point ) => {
    near++
    currentPoint = point
    console.log('Near')
    drawPoint(point)
});

mp.events.add("university:exit", () => {
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
    
    if(menuOpened) return

    menuOpened = true
    
    const menuData = []

    currentPoint.licenses.forEach(({name, label, description, price}, indx) => {
        menuData[`${indx}`] = {
            value:name,
            label,
            description,
            dataOption:{
                "Price": price
            },
            submitLabel: '<i class="fas fa-sign-in-alt" style="color:#D99441"></i> Buy'
        }
    })

    if(menuData.length == 0){
        menuData.push({
            value:"None",
            label:"There are anything to see",
            description: "There are anything to see, go out!",
            submitLabel: 'Go out'
        })
    }

    const menu = new mp.core.Menu(currentPoint.name, menuData)
    
    
    menu.on('optionSelected', (option) => {
        console.log(`optionSelected ${option}`)
    })    
    menu.on('optionClicked', async ({value}) => {
        const response = await mp.events.callRemoteProc('university:action', value);
        if(response.err){
            mp.game.graphics.notify(response.err)            
        }
        menuOpened = false
    })
    menu.on('menuClosed', () => {
        menuOpened = false
    })

    // mp.events.callRemote('shop:university:action', [currentPoint]);

})