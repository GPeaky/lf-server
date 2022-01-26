//* Here you can run tests for the server :)

mp.events.add({
	'fadeOut': (time = 0) => {
		mp.game.cam.doScreenFadeOut(time)
	},

	'fadeIn': (time = 1500) => {
		mp.game.cam.doScreenFadeIn(time)
	}
})