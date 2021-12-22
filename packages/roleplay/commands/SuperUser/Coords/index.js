mp.events.addCommand('coords', player => {
    player.call('viewCoords');
});

mp.events.addCommand('copyC', player => {
    player.call('copyCoords');
});