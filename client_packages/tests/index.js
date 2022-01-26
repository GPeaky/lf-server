//* Here you can run tests for the server :)

mp.events.add('fadeOut', () => {
	mp.game.cam.doScreenFadeOut(0);
})

mp.events.add('fadeIn', () => {
	mp.game.cam.doScreenFadeIn(1500);
})