mp.events.addCommandGroup('healme', ['superUser'], player => {
    player.health = 100;
    player.status.hunger = 100;
    player.status.thirst = 100;
    player.notify('You are healed')
});

mp.events.addCommandGroup('removeStatus', ['superUser'], player => {
    player.status.hunger = 0;
    player.status.thirst = 0;
    player.notify('You are removed status')
})