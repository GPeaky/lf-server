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


mp.events.add("shop:VehicleDeal:enter", ( point ) => {
    near++
    currentPoint = point
    drawPoint(point)
});

mp.events.add("shop:VehicleDeal:exit", ( ) => {
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

    currentPoint.vehicles.forEach(({name, label, options, price}, indx) => {
        options['Price'] = price
        menuData[`${indx}`] = {
            value:name,
            label,
            dataOption:options,
            submitLabel: 'Buy Vehicle'
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
    
    let selected = null

    menu.on('optionSelected', ({value}) => {
        if(selected == value){
            mp.events.callRemote("shop:VehicleDeal:stopPreview");
            selected = null
            return        
        }else if(selected != null){
            selected = value 
            console.log(`optionSelected ${value}`)
            mp.events.callRemote("shop:VehicleDeal:updatePreview", value);
        }
        selected = value 
        console.log(`optionSelected ${value}`)
        mp.events.callRemote("shop:VehicleDeal:startPreview", value);
    })    
    menu.on('optionClicked', async (option) => {
        mp.events.callRemote("shop:VehicleDeal:stopPreview");
        console.log(`optionClicked ${option}`)
        menuOpened = false
    })
    menu.on('menuClosed', () => {
        menuOpened = false
    })

    
    // mp.events.callRemote('shop:VehicleDeal:action', [currentPoint]);

})