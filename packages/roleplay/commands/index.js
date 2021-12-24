// SuperUser Commands
require('./SuperUser');

mp.events.addCommand('logout', player => {
    player.logout()
})