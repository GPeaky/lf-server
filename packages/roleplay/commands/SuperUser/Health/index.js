mp.events.addCommandGroup('healme', ['superUser'],player => {
    player.health = 100;
    player.notify('You are healed')
});