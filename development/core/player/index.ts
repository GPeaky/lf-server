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

    player.load = ({ _id, data: { internal, shared }, role }) => {
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

    player.save = async() => {
        if ( player.shared?.loaded ) return
        const playerData = mp.utils.PlayerData(player)

        player.data.shared = { ...playerData.shared }

        await mp.database.player.findByIdAndUpdate(player.shared.identifier, {
            data: playerData
        })
    }

    player.logout = async() => {
        if ( player.shared || player.internal ) await player.save()

        // before remove all internal and shared data
        player.shared.loaded = false
        player.dimension = config.logout.dimension
        // player.call('login:logout')
    }

    player.exist = async (email: string) => {
        const dbPlayer = await mp.database.player.findOne({
            email
        })

        if ( !dbPlayer ) return false
        return dbPlayer
    }

    player.spawnVehicle = (vehicle: string, position: Vector3, heading: number) => {
        const spawnedVehicle = mp.vehicles.new(mp.joaat(vehicle), new mp.Vector3(position), {
            heading,
            numberPlate: mp.utils.generateNumberPlate(),
            dimension: player.dimension
        })

        player.putIntoVehicle(spawnedVehicle, 0)

        // TODO: add additional data to vehicle and initialize
        /*
            veh.vehicleCreator = player.shared.identifier;
            veh.position = {x: position.x, y: position.y, z: position.z - 0.3};

            player.shared.vehicleKeys[veh.numberPlate] = {
                vehicleCreator: player.shared.identifier,
                isOwner: true
            };

            Instantiate(veh)
         */

        return spawnedVehicle
    }

    player.repairVehicle = () => {
        // TODO: Add In Game notifications
        if (!player.vehicle) return console.log('You Are not in a vehicle')

        player.vehicle.repair()
        console.log('Vehicle repaired')
    }

    player.deleteVehicle = () => {
        if ( !player.vehicle ) return console.log('You are not in a vehicle')

        /*
            TODO: Add remove vehicle in vehicle controller
            Remove(player.vehicle)
         */

        player.vehicle.destroy()
        // TODO: Add in game notification
        console.log('Vehicle Deleted')
    }

    // TODO: create player.notify function
})