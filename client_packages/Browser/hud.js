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
            ${(player.getVariable('hunger')) ? player.getVariable('hunger') : '100'}, 
            ${(player.getVariable('thirst')) ? player.getVariable('thirst') : '100'})
        `);
    }
}, 500);