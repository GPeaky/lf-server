const player = mp.players.local

mp.events.addProc('isPlayerRunning', async () => {
	if ( player.vehicle ) return false
	return ( player.isSprinting() )
})

setInterval(() => {
	if (!player.getVariable('shared')?.loaded) return
	if ( player.getVariable('shared')?.status.stamina < 30 ) {
		mp.game.graphics.notify('You are tired')
	}
	mp.game.player.restoreStamina(Number(player.getVariable('shared')?.status.stamina))
}, 1000)
