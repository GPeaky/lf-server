import argon2 from 'argon2'
import config from '@config/config'

mp.events.add('playerJoin', player => {
    player.create = async( email: string, password: string ) => {
        if ( player.shared?.loaded ) return

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
        if ( player.shared?.loaded ) return
        const playerData = mp.utils.PlayerData(player)

        player.data.shared = { ...playerData.shared }

        await mp.database.player.findByIdAndUpdate(player.shared.identifier, {
            data: playerData
        })
    }

    player.load = async({ _id, data: { internal, shared }, role }) => {
        if ( player.shared?.loaded ) return

        // Principal Variables
        player.name = `Unknown #${ _id }`
        player.health = internal.health
        player.armour = internal.armor
        player.heading = internal.heading
        player.position = internal.position
        player.dimension = internal.dimension

        // Loading internal and shared
        player.shared = shared
        player.internal = internal
        player.internal.role = role
        player.shared.identifier = _id

        // Loading Weapons
        for( const weapon in internal.allWeapons) {
            player.giveWeapon(Number(weapon) as HashOrNumberOrString<number>, internal.allWeapons[weapon] as number)
        }

        // Loading Clothes
        shared.clothes.forEach((clothes, index) => {
            player.setClothes(parseInt(index), parseInt(clothes[0].drawable) , parseInt(clothes[0].texture), 0)
        })

        // TODO: Optimize this function
        mp.players.forEach((entity: PlayerMp) => {
            if ( entity.id !== player.id ) {
                if ( entity.shared.identifier === _id ) {
                    entity.notify('Someone has logged in with your account')
                    entity.kickSilent()
                }
            }
        })

        player.shared.loaded = true
        player.data.shared = { ...player.shared }

        /* TODO: Call logged events
        player.call('login:logged')
        player.call('userLoaded')
        */
    }
})