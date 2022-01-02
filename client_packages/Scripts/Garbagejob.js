mp.events.add('job:garbage:started', async (vehRID) => {
    const vehicle = await mp.vehicles.atRemoteId(vehRID)
    if (!vehicle) return mp.events.callRemote('job:garbage:stop')
    while (mp.players.local?.vehicle?.remoteId !== vehRID) {
        await mp.utils.wait(1000)
        mp.game.graphics.notify('Get into the garbage truck')
    }
    mp.game.graphics.notify('You got it into the vehicle')
})