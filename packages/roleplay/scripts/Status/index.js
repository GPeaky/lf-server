setInterval(() => {
    mp.players.forEach(async player => {
        if( player.shared.loaded && !player.internal.isDead ){
            if(await player.callProc('isPlayerRunning') && player.shared.status.stamina >= 10) player.shared.status.stamina -= 10
            else if (player.shared.status.stamina <= 95) player.shared.status.stamina += 5

            if( player.shared.status.hunger > 0 && player.shared.status.thirst > 0 ){
                player.shared.status.hunger -= .04;
                player.shared.status.thirst -= .04;
            } else {
                player.health -= 2;
            }
        }
    });
}, 2000);

mp.events.addCommand('myStatus', player => {
    player.outputChatBox(`Hunger: ${player.shared.status.hunger}%, Thirst: ${player.shared.status.thirst}%, Stamina: ${player.shared.status.stamina}%`);
})