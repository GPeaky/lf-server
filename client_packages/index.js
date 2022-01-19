const player = mp.players.local;
mp.utils = {}
mp.utils.wait = async(ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Utils 
require('./utils')

// Browser 
require('Browser')

// Require Discord
require('./Discord')

// Super User
require('./SuperUser')

// Scripts
require('./Scripts')
require('./Scripts/FuelShop.js')
require('./Scripts/Garbagejob.js')
require('./Scripts/Busjob.js')
require('./Scripts/TruckerJob.js')
require('./Scripts/Core.js')

// Tests
require('./tests')

// Keybinds
require('./Keybinds')