const browser = mp.browsers.new('package://Coords/index.html');
browser.active= false;

mp.events.add('viewCoords', () => {
    const player = mp.players.local;
    browser.active = !browser.active;
    
    mp.events.add('render', () => {

        if (browser.active) {
            browser.execute(`setCoords(${player.position}, ${player.heading})`);
        }
    })
})