mp.events.add('playerDeath', (player, reason, killer) => {
    player.notify('~r~You died');
    player.notify('You will be revived in 5 seconds');
    setTimeout(() => {
        player.spawn(player.position);
    }, 5000)
})