mp.events.addCommandGroup('healme', ['superUser'], player => {
    player.health = 100;
    player.shared.status.hunger = 100;
    player.shared.status.thirst = 100;
    player.notify('You are healed')
});

mp.events.addCommandGroup('removeStatus', ['superUser'], player => {
    player.shared.status.hunger = 0;
    player.shared.status.thirst = 0;
    player.notify('You are removed status')
})