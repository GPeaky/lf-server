mp.events.add("add_voice_listener", (player, target) =>
{
	if(target)
	{
		player.enableVoiceTo(target);
        console.log(`Enabling voice for ${player.id} to ${target.id}`)
	}
});

mp.events.add("remove_voice_listener", (player, target) =>
{
    if(target)
	{
        player.disableVoiceTo(target);
        console.log(`Disabling voice for ${player.id} to ${target.id}`)
	}
});