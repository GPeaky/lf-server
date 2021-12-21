const browser = mp.browser.new('package://utils/Coords.html');
browser.active= false;

mp.events.add('viewCoords', () => {
    const player = mp.players.local;

    mp.events.add('render', () => {
        browser.active = !browser.active;

        if (browser.active) {
            browser.execute(`
                document.getElementById('coords').innerHTML = '${player.position.x.toFixed(2)} ${player.position.y.toFixed(2)} ${player.position.z.toFixed(2)}';
            `);
        }
    })
})