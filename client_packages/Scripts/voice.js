const local_player = mp.players.local
const MaxRange = 10
const localListeners = {}

const addListener = (_playerTarget) => {
    // mp.gui.chat.push(`Adding ${_playerTarget.getVariable('shared')?.identifier}`)
    if (localListeners[_playerTarget.getVariable('shared')?.identifier]) return
    localListeners[_playerTarget.getVariable('shared')?.identifier] = _playerTarget
    mp.events.callRemote('core:addVListener', _playerTarget)
}

const disableListener = (_playerTarget) => {
    // mp.gui.chat.push(`Removing ${_playerTarget.getVariable('shared')?.identifier}`)
    if (!localListeners[_playerTarget.getVariable('shared')?.identifier]) return
    delete localListeners[_playerTarget.getVariable('shared')?.identifier]
    mp.events.callRemote('core:disableVListener', _playerTarget)
}

setInterval(() => {
    mp.voiceChat.muted = true
    mp.players.forEachInStreamRange(async _player => {
        if (_player.getVariable('shared')?.identifier != local_player.getVariable('shared')?.identifier) {
            _player.voice3d = true
            _playerPos = _player.position; localPos = local_player.position
            
            const dist = mp.game.system.vdist(_playerPos.x, _playerPos.y, _playerPos.z, localPos.x, localPos.y, localPos.z);
            _player.voiceVolume = 2 - (dist / MaxRange);
            
            if ((dist / MaxRange) >= 1) {disableListener(_player)} else addListener(_player);
        }
        
    })
}, 250);