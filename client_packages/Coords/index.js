const browser = mp.browsers.new('package://Coords/index.html');
const player = mp.players.local;
browser.active= true;

mp.events.add('viewCoords', () => {
    browser.active = !browser.active;
})

mp.events.add('render', () => {

    if (browser.active) {
        browser.execute(`setCoords(${player.position.x.toFixed(2)}, ${player.position.y.toFixed(2)}, ${player.position.z.toFixed(2)})`);
    }
})