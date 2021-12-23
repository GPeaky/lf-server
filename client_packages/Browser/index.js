// Coords 
const coordsBrowser = mp.browsers.new('package://Cef/Coords/index.html');
const player = mp.players.local;
coordsBrowser.active= false;
coordsBrowser.cop = false;

mp.events.add('viewCoords', () => {
    coordsBrowser.active = !coordsBrowser.active;
})

mp.events.add('copyCoords', () => {
    coordsBrowser.cop = true;
})

mp.events.add('render', () => {
    if (coordsBrowser.active) {
        coordsBrowser.execute(`setCoords(${player.position.x.toFixed(2)}, ${player.position.y.toFixed(2)}, ${player.position.z.toFixed(2)})`);
    }
    if(coordsBrowser.cop){
        coordsBrowser.execute(`copyCoords(${player.position.x.toFixed(2)}, ${player.position.y.toFixed(2)}, ${player.position.z.toFixed(2)}, ${player.getHeading().toFixed(2)})`);
        coordsBrowser.cop = false;
    }
})

// Login d
const loginBrowser = mp.browsers.new('package://Cef/Login/index.html');
loginBrowser.active = false;

mp.keys.bind(0x7B, true, () => {
    const state = !mp.gui.cursor.visible
    mp.gui.cursor.show(state, state)
})


// Speedometer 
const speedometerBrowser = mp.browsers.new('package://Cef/Speedometer/index.html');
speedometerBrowser.active= false;

mp.events.add('render', () => {
    if( player.vehicle ) {
        speedometerBrowser.active = true;
        const velocity = player.vehicle.getSpeed() * 3.6;
        const gas = player.vehicle.getPetrolTankHealth();
        const rpm = player.vehicle.rpm;
        speedometerBrowser.execute(`setSpeedometer(${velocity.toFixed(0)}, ${rpm * 10000}, ${gas.toFixed(0)})`);
    } else speedometerBrowser.active = false;
}) 