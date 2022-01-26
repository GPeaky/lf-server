const Weathers = ['EXTRASUNNY', 'CLEAR', 'CLOUDS', 'SMOG', 'FOGGY', 'OVERCAST', 'RAIN', 'THUNDER', 'CLEARING', 'NEUTRAL', 'SNOW', 'BLIZZARD', 'SNOWLIGHT', 'XMAS', 'HALLOWEEN']

mp.events.addCommandGroup('setTime', ['superUser'], (player, _args, hour, minute) => {
    if ( !hour || !minute ) return player.outputChatBox('Usage: /setTime [hour] [minute]')

    mp.world.time.set(parseInt(hour), parseInt(minute), 0);
    player.notify(`You have set the time to ${hour}:${minute}`);
})

mp.events.addCommandGroup('setWeather', ['superUser'], (player, type) => {
    if ( !type ) return player.outputChatBox('Usage: /setWeather [weather]')
    if( !Weathers.includes(type) ) return player.outputChatBox('Weather not found')

    mp.world.weather = type;
    player.notify(`You have set the weather to ${type}`);
})

mp.events.addCommandGroup('startWeather', ['superUser'], (player, _args, type, delay) => {
    if ( !type || !delay ) return player.outputChatBox('Usage: /startWeather [weather] [delay]')
    if ( !Weathers.includes(type) ) return player.outputChatBox('Weather not found')

    mp.world.setWeatherTransition(type, parseInt(delay));
    player.notify(`You have set the weather to ${type}`);
})