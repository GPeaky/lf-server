module.exports = player => {
    console.log('RUNNED WITH' + player.name + player.role)
    if (player.role === 'superUser'){
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
    }
}