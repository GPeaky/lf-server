mp.events.addCommand('hear', async(player) => {
	mp.players.forEach((_player) => {
		if(player == _player) return false;
		
		console.log(`Activating voice for ${_player.id}`)
		player.enableVoiceTo(_player);
	});
})

mp.events.addCommand('defeand', async(player) => {
	mp.players.forEach((_player) => {
		if(player == _player) return false;
		
		console.log(`Disabling voice for ${_player.id}`)
		player.disableVoiceTo(_player);
	});
})

mp.events.add("core:addVListener", (player, target) => {
	if(target) {
		player.enableVoiceTo(target);
        console.log(`Enabling voice for ${player.id} to ${target.id}`)
	}
});

mp.events.add("core:disableVListener", (player, target) => {
    if(target) {
        player.disableVoiceTo(target);
        console.log(`Disabling voice for ${player.id} to ${target.id}`)
	}
});