const respawnTime = 1000;
const obligatoryRespawnTime = 60000;

mp.events.add('playerDeath', player => {
    player.shared.isDead = true;
    player.shared.canRespawn = false;
    player.notify(`You died! You can respawn in ${ respawnTime / 1000 } seconds`);

    const Revive = () => {
        if( !player.shared.isDead ) return;
        player.shared.isDead = false;
        player.shared.canRespawn = false;

        if ( player.shared.status.hunger <= 0 || player.shared.status.thirst <= 0 ) {
            player.shared.status = {
                ...player.shared.status,
                thirst: 50,
                hunger: 50,
            }
        }

        player.notify(`Finally the medical team found you and you are here again!`);
        player.spawn(player.position);
    }

    mp.events.add(`Keydown::45`, (r_player) => {
        if( r_player != player ) return
        if( !player.shared.isDead ) return
        if( !player.shared.canRespawn ) return

        Revive();
    });
    
    setTimeout(() => {
        player.shared.canRespawn = true;
        player.notify(`You can press E to respawn you will respawn in ${ obligatoryRespawnTime / 1000 } seconds`);
    }, respawnTime)
    
    setTimeout(Revive, obligatoryRespawnTime)
})