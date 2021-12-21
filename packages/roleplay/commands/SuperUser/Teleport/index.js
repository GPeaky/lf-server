// TODO: We need to test this command
mp.events.addCommand('tp', (player, id) => {
    mp.players.map(_player => {
        if(_player.id === id) {
            player.position = _player.position
            player.notify(`~y~Teleported to player ${_player.id}`)
            _player.notify(`~y~SuperUser teleported to you`)
        }
    })
})