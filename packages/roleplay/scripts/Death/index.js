const respawnTime = 1000;
const obligatoryRespawnTime = 60000;
const respawnPosition = new mp.Vector3(0, 0, 0); //Set the respawn position

mp.events.add('playerDeath', (player) => {
    player.shared.isDead = true;
    player.shared.canRespawn = false;
    //Show in screen the death message with a regressive timer
    player.notify(`You died! You can respawn in ${respawnTime / 1000} seconds`);

    mp.events.add(`Keydown::45`, (r_player) => {
        if(r_player != player) return
        if(!player.shared.canRespawn) return
        if(!player.shared.isDead) return
        Revive();       
    });

    const Revive = () => {
        if(!player.shared.isDead) return;
        player.shared.isDead = false;
        player.shared.canRespawn = false;
        //Get out all the illegal items on the player inventory and respawn him
        player.notify(`Finnaly the medical team found you and you are here again!`);
        player.spawn(respawnPosition);
    }
    
    setTimeout(() => {
        player.shared.canRespawn = true;
        //Start the regresive timer of the obligatory respawn
        player.notify(`You can press ~y~E~w~ to respawn you will respawn in ${obligatoryRespawnTime / 1000} seconds`);
        //Start whowin a red flashes screen to the player
    }, respawnTime)
    
    setTimeout(Revive, obligatoryRespawnTime)
})