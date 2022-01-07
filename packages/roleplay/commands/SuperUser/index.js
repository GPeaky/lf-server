const fuelPointsArr = [{
    name: false,
    blip:{
        name: false,
        coords: false,
        sprite: 361,
        color: 29
    },
    points: []
}]

mp.events.addCommand('fuelPoint', player => {
    if( fuelPointsArr[0].blip.coords == false ) return fuelPointsArr[0].blip.coords = { x: Number(player.position.x.toFixed(2)), y: Number(player.position.y.toFixed(2)), z: Number(player.position.z.toFixed(2) -1)}, player.notify('New Fuel Station registered, adding master coord');
    fuelPointsArr[0].points.push({ x: Number(player.position.x.toFixed(2)), y: Number(player.position.y.toFixed(2)), z: Number(player.position.z.toFixed(2) -1)})

    player.notify('Point Added to fuelPointsArr')
})

mp.events.addCommand('getFuelPoint', player => {
    console.log(fuelPointsArr[0])
    player.notify('Fuel points showed on cmd, and deleting array...')
})

mp.events.addCommandGroup = (commandName, groups, callback) => {
    mp.events.addCommand(commandName, (player, ...args) => {
        if (!groups.includes(player.internal.role)) return;
        callback(player, ...args);
    })
}

// Player
require('./Player')

// Vehicles 
require('./Vehicles')

// Weapons
require('./Weapons')

// Teleport 
require('./Teleport')

// Health 
require('./Health')

// Coords 
require('./Coords')

// Weather 
require('./Weather')

// Kick 
require('./Kick')