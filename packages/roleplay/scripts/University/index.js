const Config = require('./config.json')

Config.forEach(({ menu, blip, licenses, name }, index ) => {
    new mp.core.Blips(blip)
    new mp.Vector3(menu.x, menu.y, menu.z)
    const colshape = mp.colshapes.newRectangle(menu.x, menu.y, 3, 3, 0)

    mp.events.add({
        'playerEnterColshape': ( player, shape ) => {
            if ( shape !== colshape ) return
            player.call('university:enter', [{ index, menu, licenses, name }])
        },

        'playerExitColshape': ( player, shape ) => {
            if ( shape !== colshape ) return
            player.call('university:exit', [{ index, menu }])
        }
    })
})

mp.events.addProc('university:action', async (player, name) => {
    const point = Config.find( point => point.licenses.find( pto => pto.name == name ) != undefined).licenses.find( pto => pto.name == name )
    if( player.shared.licenses == undefined ) player.shared.licenses = {}
    if( point.price > player.balance ) return { status:false, err:'You need more money to pay this' }
    if( player.shared.licenses[`${point.name}`] ) return { status:false, err:'You have buyed this license' }


    player.shared.licenses[`${point.name}`] = point
    player.notify(`You bought ${point.label}`);
    return { status:true }
})