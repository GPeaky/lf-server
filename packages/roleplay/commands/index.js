// SuperUser Commands
require('./SuperUser');

mp.events.addCommand('login', player => {
    console.log('EXECUTED')
    player.call('viewLogin')
})