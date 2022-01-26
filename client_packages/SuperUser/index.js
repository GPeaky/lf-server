// Copied from the forum, is a bullshit
mp.events.add('playerCommand', command => {
    if( command === 'cls'){
        mp.console.clear()
        mp.console.logInfo('Console cleared', true, true)
    }

    if(command === 'tpm') {
        if (mp.game.invoke('0x1DD1F58F493F1DA5')) {
            const blipIterator = mp.game.invoke('0x186E5D252FA50E7D');
            const FirstInfoId = mp.game.invoke('0x1BEDE233E6CD2A1F', blipIterator);
            const NextInfoId = mp.game.invoke('0x14F96AA50D6FBEA7', blipIterator);
            for (let i = FirstInfoId; mp.game.invoke('0xA6DB27D19ECBB7DA', i) != 0; i = NextInfoId) {
                if (mp.game.invoke('0xBE9B0959FFD0779B', i) == 4) {
                    const oldpos = mp.players.local.position;
                    const coord = mp.game.ui.getBlipInfoIdCoord(i);
    
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

    if ( command === 'openMenu' ) {
        const menu = new mp.core.Menu( '<i class="fab fa-github"></i> Consencionario', [
            {
                value:'ferrari',
                label:'Ferrari',
                description:1200000 ,
                dataOption:{
                    enrollment: '488 WNW',
                    state: 89,
                    price: 20.150,
                },
                submitLabel: 'Spawn'
            },
            {
                value:'p1',
                label:'Mclaren p1',
                description:1850000 ,
                dataOption:{
                    enrollment: '488 WNW',
                    state: 89,
                    price: 20.150,
                },
                submitLabel: 'Spawn'
            },
            {
                value:'senna',
                label:'Mclaren Senna',
                description:10500 ,
                dataOption:{
                    enrollment: '488 WNW',
                    state: 89,
                    price: 20.150,
                },
                submitLabel: 'Spawn'
            }
        ])
        
        menu.on('optionSelected', (option) => {
            console.log(`optionSelected ${option}`)
        })
        menu.on('optionClicked', (option) => {
            console.log(`optionClicked ${option}`)
        })
        menu.on('menuClosed', () => {
            console.log('menu closed')
        })
    } else if ( command === 'closeMenu') {
        console.log('closeMenu')
        menu.hide()
    } else if ( command === 'updateMenu') {
        console.log('updateMenu')
        menu.update([{
            value:'ferrari',
            label:'Ferrari',
            description:1200000 ,
            dataOption:{
                enrollment: '488 WNW',
                state: 89,
                price: 20.150
            }
        }])
    }
})