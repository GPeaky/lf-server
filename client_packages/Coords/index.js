const browser = mp.browsers.new('package://Coords/index.html');
browser.active= false;

mp.events.add('viewCoords', () => {
    const player = mp.players.local;

    mp.events.add('render', () => {
        browser.active = !browser.active;

        if (browser.active) {
            browser.execute(`
                document.getElementById('coords').innerHTML = 
                <p class="text" id="x">x: ${player.position.x}</p>
                <p class="text" id="y">y: ${player.position.y}</p>
                <p class="text" id="z">z: ${player.position.z}</p>
                <p class="text" id="h">h: ${player.heading}</p>
                ;
            `)
        }
    })
})