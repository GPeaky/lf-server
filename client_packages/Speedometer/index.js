const browser = mp.browsers.new('package://Speedometer/index.html');
const player = mp.players.local;
browser.active= false;

mp.events.add('render', () => {
    if( player.vehicle ) {
        browser.active = true;

        const velocity = player.vehicle.getSpeed() * 3.6;
        const gas = player.vehicle.getPetrolTankHealth();
        const rpm = player.vehicle.rpm;

        browser.execute(`setSpeedometer(${velocity.toFixed(0)}, ${rpm}, ${gas.toFixed(0)})`);
    } else browser.active = false;
}) 