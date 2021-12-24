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