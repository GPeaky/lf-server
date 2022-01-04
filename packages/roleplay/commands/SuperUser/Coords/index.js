mp.events.addCommandGroup('coords', ['superUser'], player => {
    if (!player.internal.role === 'superUser') return;
    player.call('viewCoords');
});

mp.events.addCommandGroup('copyC', ['superUser'], player => {
    player.call('copyCoords');
});

mp.events.addCommandGroup('copyV', ['superUser'], player => {
    player.call('copyCoordsV');
});