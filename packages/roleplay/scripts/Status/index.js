setInterval(() => {
    mp.players.forEach(player => {
        if( player.shared.loaded && !player.internal.isDead ){
            // console.log(player.action)
            if( player.shared.status.hunger > 0 && player.shared.status.thirst > 0 ){
                console.log(`Player ${player.id} alive, substract .04 `)
                player.shared.status.hunger -= .04;
                player.shared.status.thirst -= .04;
            } else {
                // console.log(`Player ${player.id} without status, substract 2 from life `)
                player.health -= 2;
            }
        }  
    });
}, 2000);

mp.events.addCommand('myStatus', player => {
    player.outputChatBox(`Hunger: ${player.shared.status.hunger}%, Thirst: ${player.shared.status.thirst}%`);
})