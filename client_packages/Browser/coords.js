const coordsBrowser = mp.browsers.new('package://Cef/Coords/index.html');
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
