const Weathers = ['EXTRASUNNY', 'CLEAR','CLOUDS','SMOG','FOGGY','OVERCAST','RAIN','THUNDER','CLEARING','NEUTRAL','SNOW','BLIZZARD','SNOWLIGHT','XMAS','HALLOWEEN']

mp.events.addCommandGroup('setTime', ['superUser'], (player, _args, hour, minute) => {
    if(hour && minute) {
        mp.world.time.set(parseInt(hour), parseInt(minute), 0)
        player.notify(`You have set the time to ${hour}:${minute}`)
    } else player.notify('Please enter a time.')
});

mp.events.addCommandGroup('setWeather', ['superUser'], (player, type) => {
    if(type) {
        if(Weathers.includes(type)) {
            mp.world.weather = type;
            player.notify(`You have set the weather to ${type}`);
        } else player.notify('Invalid weather type.');
    }else player.notify('Please enter a weather type.');
})

mp.events.addCommandGroup('startWeather', ['superUser'], (player, _args, type, delay) => {
    if(type && delay) {
        if(Weathers.includes(type)) {
            mp.world.setWeatherTransition(type, parseInt(delay));
            player.notify(`You have set the weather to ${type}`);
        } else player.notify('Invalid weather type.');
    }else player.notify('Please enter a weather type and time.');
})