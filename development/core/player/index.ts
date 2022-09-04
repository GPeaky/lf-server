import argon2 from 'argon2'
import config from '@config/config'

mp.events.add('playerJoin', player => {
    player.create = async( email: string, password: string ) => {
        // TODO: Check if player is already loaded

        player.health = 100
        player.dimension = 0
        player.heading = config.spawn.heading
        player.position = new mp.Vector3(config.spawn.position)
        mp.utils.setDefaultClothes(player)

        await mp.database.player.create({
            email: email,
            password: await argon2.hash( password ),
            data: mp.utils.PlayerData(player)
        })
    }

    player.save = async() => {
        // TODO: Check if player is already loaded
        const playerData = mp.utils.PlayerData(player)

        player.data.shared = { ...playerData.shared }

        await mp.database.player.findByIdAndUpdate(player.shared.identifier, {
            data: playerData
        })
    }
})