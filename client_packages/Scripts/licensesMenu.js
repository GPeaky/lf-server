const player = mp.players.local

mp.events.add('playerCommand', command => {
    if ( command !== 'licenses' ) return
    const { licenses } = player.getVariable('shared')
    
    new mp.core.Menu(`Licenses Menu`, 
        Object.values(licenses).map(( license, index ) => {
            return {
                value: license.name,
                label: `${index}. ${ license.label }`,
                description: license.description
            }
        })
    )
})