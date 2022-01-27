const player = mp.players.local

mp.events.addProc('isPlayerRunning', async () => {
	if ( player.vehicle ) return false;
	return ( player.isSprinting() )
})

setInterval(() => {
	if ( player.getVariable('shared')?.status.stamina < 30 ) {
		mp.game.graphics.notify('You are tired')
	} else {
		player.isInjured = 0
	}
}, 1000)