const browser = mp.browsers.new('package://Coords/index.html');
const player = mp.players.local;
browser.active= false;
browser.cop = false;

mp.events.add('viewCoords', () => {
    browser.active = !browser.active;
})

mp.events.add('copyCoords', () => {
    browser.cop = true;
})

mp.events.add('render', () => {
    if (browser.active) {
        browser.execute(`setCoords(${player.position.x.toFixed(2)}, ${player.position.y.toFixed(2)}, ${player.position.z.toFixed(2)})`);
    }
    if(browser.cop){
        browser.execute(`copyCoords(${player.position.x.toFixed(2)}, ${player.position.y.toFixed(2)}, ${player.position.z.toFixed(2)}, ${player.getHeading().toFixed(2)})`);
        browser.cop = false;
    }
})