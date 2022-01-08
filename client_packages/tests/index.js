//* Here you can run tests for the server :)

mp.events.add('fadeOut', _player => {
	mp.game.cam.doScreenFadeOut(0);
})

mp.events.add('fadeIn', _player => {
	mp.game.cam.doScreenFadeIn(1500);
})

mp.events.addProc('locateVehicle', Pos => {
	const { streetName } = mp.game.pathfind.getStreetNameAtCoord(Pos.x, Pos.y, Pos.z, 0, 0);
	return mp.game.ui.getStreetNameFromHashKey(streetName)
})