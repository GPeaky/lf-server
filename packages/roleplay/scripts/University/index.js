const UniversityPoints = [
    {
        name: "Chamberlain Hill University",
        blip: {
            name: "Chamberlain Hill University",
            coords:{ x: -319.61,y: -1471.46,z: 30.12 },
            sprite: 361,
            color: 29            
        },
        menu: new mp.Vector3(0,0,0),
        licenses: [
            {name:'bus_license_1', label:'Bus License', description:'This is a bus license, with this bus license you can drive one of the multiple bus of the \'Sausage busline\'',price:3500}
        ]
    }
]

const Init = () => {
    UniversityPoints.forEach(( point, index ) => {
        const { menu, blip } = point
        new mp.core.Blips(blip)

        const colshape = mp.colshapes.newRectangle(menu.x, menu.y, 3, 3, 0)
        
        function playerEnterColshapeHandler(player, shape) {
            if(shape == colshape) {
                player.call("shop:university:enter", [{index,menu}])
            }
        }
        
        mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

        
        function playerExitColshapeHandler(player, shape) {
            if(shape == colshape) {
                player.call("shop:university:exit", [{index,menu}])
            }
        }
        
        mp.events.add("playerExitColshape", playerExitColshapeHandler);
    })
}

mp.events.add("shop:university:action", async (player, {index}) => {
    //TODO (Menus) player.closeAllMenus()
    //* const menuData = UniversityPoints[index].licenses
    //* const menu = await player.openMenu(menuData)
    
    //* menu.onAccept((option) => {
    //*     if(option.price > player.balance) return {status:false, err:'You need more money to pay this'}
    //*     if(player.shared.licenses == undefined){
    //*         player.shared.licenses = {}
    //*     }
    //*     if(player.shared.licenses[`${option.name}`]) return {status:false, err:'You have buyed this license'}
    //*     player.shared.licenses[`${option.name}`] = option
    //*     return {status:true}
    //* })
})

Init()