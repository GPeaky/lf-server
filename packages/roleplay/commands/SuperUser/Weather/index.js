mp.events.addCommand('settime', (player, args) => {
    args = args.split(' ');
    const hour = args[0]
    const minute = args[1]
    console.log(args)
    console.log(`${hour}:${minute}`);
    if(hour && minute) {
        mp.world.time.set(parseInt(hour), parseInt(minute), 0);
        player.notify(`You have set the time to ${hour}:${minute}`);
    } else player.notify('Please enter a time.');    
    args = null
    player = null
});

mp.events.addCommand('setweather', (player, type) => {
    const Weathers = [
        'EXTRASUNNY',
        'CLEAR',
        'CLOUDS',
        'SMOG',
        'FOGGY',
        'OVERCAST',
        'RAIN',
        'THUNDER',
        'CLEARING',
        'NEUTRAL',
        'SNOW',
        'BLIZZARD',
        'SNOWLIGHT',
        'XMAS',
        'HALLOWEEN',
    ];
    if(type) {
        if(Weathers.includes(type)) {
            mp.world.weather = type;
            player.notify(`You have set the weather to ${type}`);
        } else player.notify('Invalid weather type.');
    }else player.notify('Please enter a weather type.');
})

mp.events.addCommand('startweather', (player, args) => {
    args = args.split(' ');
    const type = args[0]
    const delay = args[1]
    const Weathers = [
        'EXTRASUNNY',
        'CLEAR',
        'CLOUDS',
        'SMOG',
        'FOGGY',
        'OVERCAST',
        'RAIN',
        'THUNDER',
        'CLEARING',
        'NEUTRAL',
        'SNOW',
        'BLIZZARD',
        'SNOWLIGHT',
        'XMAS',
        'HALLOWEEN',
    ];
    if(type && delay) {
        if(Weathers.includes(type)) {
            mp.world.setWeatherTransition(type, parseInt(delay));
            player.notify(`You have set the weather to ${type}`);
        } else player.notify('Invalid weather type.');
    }else player.notify('Please enter a weather type and time.');
    args = null
})