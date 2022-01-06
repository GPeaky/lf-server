const coordsBrowser = mp.browsers.new('package://Cef/Coords/index.html');
coordsBrowser.active= false;
coordsBrowser.cop = false;
coordsBrowser.copv = false;

mp.events.add({
    'viewCoords': () => {
        coordsBrowser.active = !coordsBrowser.active;
    },

    'copyCoords': () => {
        coordsBrowser.cop = true;
    },

    'copyCoordsV': () => {
        coordsBrowser.copv = true;
    },

    'render': () => {
        if (coordsBrowser.active) {
            coordsBrowser.execute(`setCoords(${player.position.x.toFixed(2)}, ${player.position.y.toFixed(2)}, ${player.position.z.toFixed(2)})`);
        }
        if(coordsBrowser.cop){
            coordsBrowser.execute(`copyCoords(${player.position.x.toFixed(2)}, ${player.position.y.toFixed(2)}, ${player.position.z.toFixed(2)}, ${player.getHeading().toFixed(2)})`);
            coordsBrowser.cop = false;
        }
        if(coordsBrowser.copv){
            coordsBrowser.execute(`copyCoords(${player.vehicle.position.x.toFixed(2)}, ${player.vehicle.position.y.toFixed(2)}, ${player.vehicle.position.z.toFixed(2)}, ${player.vehicle.getHeading().toFixed(2)})`);
            coordsBrowser.copv = false;
        }
    }
})