mp.events.addCommand('healme', player => {
    player.health = 100;
    player.notify('You are healed')
});