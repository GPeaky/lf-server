mp.events.addCommand('PointRace', player => {
    if(player.Checkpoints == undefined){
        player.Checkpoints = [];
    }
    player.makingcheckpoint = true;
    player.Checkpoints.push(new mp.core.Checkpoints(1, player.position, 5, new mp.Vector3(0, 0, 0), [255, 0, 0, 255], true, 0))
})

mp.events.addCommand('InviteRace', (player, args) => {
    if(args){
        const target = mp.players.at(args);
        if(target){
            if(player.Integrants == undefined){
                player.Integrants = [player];
            }
            player.Integrants.push(target);
            target.notify("~g~You are joined to a race.");
            player.notify(`~g~Sucesfully added to ${target.name}`);
        }
    }else player.notify("You need to specify a player.")
})

mp.events.addCommand('StartRace', async(player) => {
    if(player.Integrants == undefined){
        player.Integrants = [player];
    }
    let vehiclePos
    player.makingcheckpoint = false;
    player.Integrants.forEach(target => {
        if(target.vehicle){
            vehiclePos = target.vehicle.position;
            target.makingcheckpoint = false;
            target.Checkpoints = player.Checkpoints
            target.Integrants = player.Integrants
        }
    });
    for (let index = 5; index > -1; index--) {
        await mp.utils.wait(1000);
        if(index == 0){
            player.Integrants.forEach(target => {
                target.vehicle.position = vehiclePos
                target.notify("GO!")
            });
        }else{
            player.Integrants.forEach(target => {
                if(target.vehicle){
                    target.notify(`${index} seconds left`);
                    target.vehicle.position = vehiclePos
                }
            });
        }    
    }
})

mp.events.add("playerEnterCheckpoint", (player, checkpoint) => {
    if(player.makingcheckpoint) return;
    if(player.Checkpoints[0].checkpoint == checkpoint) {
        player.Checkpoints[0].checkpoint.hideFor(player);
        //Delete checkpoint
        player.Checkpoints.shift();
    }

    if(player.Checkpoints.length == 0) {
        player.Integrants.forEach(target => {
            target.notify(`${player.name} finished the race!`)
        });
    }
});