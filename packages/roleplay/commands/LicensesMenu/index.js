mp.events.addCommand('licenses', player => {
    new mp.core.Menu(player, `Licenses Menu`, 
        Object.values( player.shared.licenses ).map(( license, index ) => {
            return {
                value: license.name,
                label: `${index}. ${ license.label }`,
                description: license.description
            }
        })
    )
})