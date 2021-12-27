const Status = player => {
    setInterval(() => {
        if( !player.isDead && player.loaded ){
            if( player.status.hunger > 0 && player.status.thirst > 0 ){
                player.status.hunger -= .04;
                player.status.thirst -= .04;

                player.setVariables({
                    hunger: player.status.hunger,
                    thirst: player.status.thirst,
                })
            
            }
        } 
    }, 2000);

    setInterval(() => {
        if( !player.isDead && player.loaded ){
            if( player.status.hunger <= 0 && player.status.thirst <= 0 ){
                player.health -= 10;
            }
        } 
    }, 10000);
}

mp.events.addCommand('myStatus', player => {
    player.outputChatBox(`Hunger: ${player.status.hunger}%, Thirst: ${player.status.thirst}%`);
})

module.exports = Status;