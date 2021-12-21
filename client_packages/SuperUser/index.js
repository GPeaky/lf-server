// Copied from the forum, is a bullshit
mp.events.add('playerCommand', command => {
    if(command === 'tpm') {
        if (mp.game.invoke('0x1DD1F58F493F1DA5')) {
            let blipIterator = mp.game.invoke('0x186E5D252FA50E7D');
            const FirstInfoId = mp.game.invoke('0x1BEDE233E6CD2A1F', blipIterator);
            const NextInfoId = mp.game.invoke('0x14F96AA50D6FBEA7', blipIterator);
            for (let i = FirstInfoId; mp.game.invoke('0xA6DB27D19ECBB7DA', i) != 0; i = NextInfoId) {
                if (mp.game.invoke('0xBE9B0959FFD0779B', i) == 4) {
                    const oldpos = mp.players.local.position;
                    let coord = mp.game.ui.getBlipInfoIdCoord(i);
    
                    coord.z = mp.game.gameplay.getGroundZFor3dCoord(coord.x, coord.y, i * 50, 0, false); // try calcualte Z
                    mp.players.local.setCoordsKeepVehicle(coord.x, coord.y, coord.z);
                      
                    mp.players.local.freezePosition(true);
                    setTimeout(() => { // let the game load the map
                        let j = 0;
                        while (j <= 60 && coord.z == 0) { // try to find it by trying different heights
                            coord.z = mp.game.gameplay.getGroundZFor3dCoord(coord.x, coord.y, i * 25, 0, false);
                            j++;
                        }
    
                        if (coord.z != 0) { // if found groundZ
                            mp.players.local.setCoordsKeepVehicle(coord.x, coord.y, coord.z);
                            mp.gui.chat.push(`You have been teleported`);
                        } else {
                            mp.players.local.setCoordsKeepVehicle(oldpos.x, oldpos.y, oldpos.z);
                            mp.gui.chat.push("Could not find elevation at waypoint position!");
                        }
                        mp.players.local.freezePosition(false);
                    }, 2000);
                }
            }
        }
    }
})