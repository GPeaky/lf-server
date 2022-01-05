const player =  mp.players.local
const hudBrowser = mp.browsers.new('package://Cef/Hud/index.html');
hudBrowser.active = true; 

mp.events.add('viewHud', () => {
    hudBrowser.active = !hudBrowser.active;
})

setInterval(() => {
    if( hudBrowser.active ) {
        hudBrowser.execute(`setHud(
            ${player.id}, 
            ${player.getHealth()}, 
            ${player.getArmour()}, 
            ${(player.getVariable('shared')?.status.hunger) ? player.getVariable('shared')?.status.hunger : '100'}, 
            ${(player.getVariable('shared')?.status.thirst) ? player.getVariable('shared')?.status.thirst : '100'})
        `);
    }
}, 500);