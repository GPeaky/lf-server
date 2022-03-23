const player = mp.players.local
let counter = 0;

setInterval(() => {
    ( player.isStopped() ) ? counter ++ : counter = 0

    if ( counter >= 600 ) mp.events.callRemote('antiAfk:kick') // counter 600 = 20 minutes
}, 2000)