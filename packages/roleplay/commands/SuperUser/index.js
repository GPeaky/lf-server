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