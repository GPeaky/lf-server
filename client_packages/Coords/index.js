const browser = mp.browsers.new('package://Coords/index.html');
browser.active= false;

mp.events.add('viewCoords', () => {
    const player = mp.players.local;

    mp.events.add('render', () => {
        browser.active = !browser.active;

        if (browser.active) {
            browser.execute(`setCoords(${player.position}, ${player.heading})`);
        }
    })
})