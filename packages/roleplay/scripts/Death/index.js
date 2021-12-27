mp.events.add('playerDeath', (player) => {
    player.isDead = true;
    player.notify('~r~You died');
    player.notify('You will be revived in 5 seconds');
    setTimeout(() => {
        player.spawn(player.position);
        player.isDead = false;
    }, 5000)
})