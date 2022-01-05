const player =  mp.players.local
const hudBrowser = mp.browsers.new('package://Cef/Hud/index.html');
hudBrowser.active = true; 

mp.events.add('viewHud', () => {
    hudBrowser.active = !hudBrowser.active;
})

setInterval(() => {
    const shared = player.getVariable('shared');
    console.log(shared);
    if( hudBrowser.active ) {

        hudBrowser.execute(`setHud(
            ${player.id}, 
            ${player.getHealth()}, 
            ${player.getArmour()}, 
            ${(shared.status.hunger) ? shared.status.hunger : '100'}, 
            ${(shared.status.thirst) ? shared.status.thirst : '100'})
        `);
    }
}, 500);