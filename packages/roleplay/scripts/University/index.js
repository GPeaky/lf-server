const UniversityPoints = [
    {
        name: "Chamberlain Hill University",
        blip: {
            name: "Chamberlain Hill University",
            //318.36 , -1631.69 , 32.53 , 217.97
            coords:{ x: 318.36, y: -1631.69, z: 32.53 },
            sprite: 475,
            color: 29            
        },
        menu: new mp.Vector3(318.36 , -1631.69 , 32.53),
        licenses: [
            {name:'bus_license_1', label:'Bus License lvl 1', description:'This is a bus license, with this bus license you can drive one of the multiple bus of the \'Sausage busline\'\n',price:3500},
            {name:'bus_license_2', label:'Bus License lvl 2', description:'This is a bus license, with this bus license you can drive one of the multiple bus of the \'Sausage busline\'\n',price:5000},
            {name:'bus_license_3', label:'Bus License lvl 3', description:'This is a bus license, with this bus license you can drive one of the multiple bus of the \'Sausage busline\'\n',price:7500}
        ]
    }
]

const Init = () => {
    UniversityPoints.forEach(( point, index ) => {
        const { menu, blip, licenses, name } = point
        new mp.core.Blips(blip)

        const colshape = mp.colshapes.newRectangle(menu.x, menu.y, 3, 3, 0)
        
        function playerEnterColshapeHandler(player, shape) {
            if(shape == colshape) {
                player.call("university:enter", [{index,menu, licenses, name}])
            }
        }
        
        mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

        
        function playerExitColshapeHandler(player, shape) {
            if(shape == colshape) {
                player.call("university:exit", [{index,menu}])
            }
        }
        
        mp.events.add("playerExitColshape", playerExitColshapeHandler);
    })
}

mp.events.addProc("university:action", async (player, name) => {
    const point = UniversityPoints.find(point => point.licenses.find(pto => pto.name == name) != undefined).licenses.find(pto => pto.name == name)
    if(point.price > player.balance) return {status:false, err:'You need more money to pay this'}
    if(player.shared.licenses == undefined){
        player.shared.licenses = {}
    }
    if(player.shared.licenses[`${point.name}`]) return {status:false, err:'You have buyed this license'}
    player.shared.licenses[`${point.name}`] = point
    player.notify(`You bought ${point.label}`);
    return {status:true}
})

Init()