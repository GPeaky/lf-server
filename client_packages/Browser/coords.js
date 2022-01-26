const browser = mp.browsers.new('package://Cef/Coords/index.html');

browser.active= false;
browser.cop = false;
browser.copv = false;

mp.events.add({
    'viewCoords': () => {
        browser.active = !browser.active;
    },

    'copyCoords': () => {
        browser.cop = true;
    },

    'copyCoordsV': () => {
        browser.copv = true;
    },

    'render': () => {
        if (browser.active) {
            browser.execute(`setCoords(${player.position.x.toFixed(2)}, ${player.position.y.toFixed(2)}, ${player.position.z.toFixed(2)})`);
        }
        if(browser.cop){
            browser.execute(`copyCoords(${player.position.x.toFixed(2)}, ${player.position.y.toFixed(2)}, ${player.position.z.toFixed(2)}, ${player.getHeading().toFixed(2)})`);
            browser.cop = false;
        }
        if(browser.copv){
            browser.execute(`copyCoords(${player.vehicle.position.x.toFixed(2)}, ${player.vehicle.position.y.toFixed(2)}, ${player.vehicle.position.z.toFixed(2)}, ${player.vehicle.getHeading().toFixed(2)})`);
            browser.copv = false;
        }
    }
})