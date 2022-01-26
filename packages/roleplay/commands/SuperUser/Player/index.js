mp.events.addCommand('logout', player => {
    console.log('player attempted logout')
    player.logout()
})

mp.events.addCommand('refreshRole', async player => {
    try {
        const Player = await mp.database.Players.findOne({
            where: {
                identifier: player.shared.identifier
            }
        })

        if(player.internal.role === Player.role) return player.notify('Your role is the same as your account role')
        player.internal.role = Player.role
        player.notify(`You have been refreshed to ${Player.role}`)
    } catch ( err ) {
        player.notify('An error occurred while refreshing your account')
    }
})

mp.events.addCommandGroup('setRole', ['superUser'], async (player, _args, id, role) => {
    const playerById = mp.players.at(id)
    if( !playerById ) return player.notify('Player not found')
    if( !role ) return player.notify('You must specify a role')
    if(!['superUser', 'user'].includes(role)) return player.notify('You must specify a valid role [superUser, user]')

    try {
        mp.database.Players.update({ role }, {
            where: {
                identifier: playerById.shared.identifier
            }
        })
        
        playerById.internal.role = role
        playerById.notify(`You have been set to ${role}`)
    } catch ( err ) {
        player.notify('An error occurred while setting the role')
    }
})