mp.events.addCommandGroup('coords', ['superUser'], player => {
    if (!player.role === 'superUser') return;
    player.call('viewCoords');
});

mp.events.addCommandGroup('copyC', ['superUser'], player => {
    player.call('copyCoords');
});