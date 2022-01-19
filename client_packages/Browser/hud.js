const player =  mp.players.local
const browser = mp.browsers.new('package://Cef/Hud/index.html'); 

setInterval(() => {
    browser.call('Hud::Update',
        '0', 
        player.getHealth(), 
        player.getVariable('shared')?.status.hunger.toFixed(0), 
        player.getVariable('shared')?.status.thirst.toFixed(0), 
        100 
    )
}, 500);