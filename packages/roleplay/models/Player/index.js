const shortId = require('shortid')
const { Instantiate, Remove } = require('../../scripts/Vehicle/controller')

mp.players.getByIdentifier = async(identifier) => {
    await mp.players.forEach(player => {
        if (player?.shared?.identifier === identifier) return(player)
    })
    return false
}

mp.events.add('playerJoin', player => {
    player.shared = {loaded: false}
    player.internal = {}
    // Player <=> Vehicles

    player.create = async(email, password) => {
        if (player.shared.loaded) return
        await mp.utils.wait(750)
        
        player.position = new mp.Vector3(-61.71 , -1218.14 , 28.7);
        
        player.health = 100;
        player.dimension = 0;
        player.heading = 248.88;
        player.internal.isDead = false;
        player.internal.balance = 
        player.shared.vehicleKeys = {};
        player.shared.status = { hunger: 100, thirst: 100 }
        
        // Set Default Data
        player.setClothes(0, 0, 0, 0);
        player.setClothes(1, 0, 0, 0);
        player.setClothes(2, 12, 0, 0);
        player.setClothes(3, 8, 0, 0);
        player.setClothes(4, 4, 0, 0);
        player.setClothes(5, 0, 0, 0);
        player.setClothes(6, 10, 0, 0);
        player.setClothes(7, 0, 0, 0);
        player.setClothes(8, 4, 0, 0);
        player.setClothes(9, 0, 0, 0);
        player.setClothes(10, 0, 0, 0);
        player.setClothes(11, 4, 0, 0);
        
        await mp.utils.wait(500)
        
        const playerData = JSON.stringify({
            internal: {
                ...player.internal,
                health: player.health,
                armor: player.armour,
                heading: player.heading,
                position: player.position,
                dimension: 0, 
                allWeapons: player.allWeapons,
                lastVehicle: player.vehicle ? {numberPlate: player.vehicle.numberPlate, seat: player.seat} : false,
            },

            shared: {
                ...player.shared,
                clothes: [
                    [   player.getClothes(0)   ],
                    [   player.getClothes(1)   ],
                    [   player.getClothes(2)   ],
                    [   player.getClothes(3)   ],
                    [   player.getClothes(4)   ],
                    [   player.getClothes(5)   ],
                    [   player.getClothes(6)   ],
                    [   player.getClothes(7)   ],
                    [   player.getClothes(8)   ],
                    [   player.getClothes(9)   ],
                    [   player.getClothes(10)  ],
                    [   player.getClothes(11)  ]
                ],
                haircolor: [player.hairColor, player.hairHighlightColor],
            },
        })
          
        mp.database.Players.create({
            email: email,
            password: password,
            data: playerData
        })
    }

    player.save = async () => {
        if (!player.shared.loaded) return
        console.log(`Saved ${player.name}`)
        const { internal, shared } = player

        const playerData = {
            internal: {
                ...internal,
                health: player.health,
                armor: player.armour,
                heading: player.heading,
                position: player.position,
                dimension: player.dimension, 
                allWeapons: player.allWeapons,
                lastVehicle: player.vehicle ? {numberPlate: player.vehicle.numberPlate, seat: player.seat} : false,
            },

            shared: {
                ...shared,
                clothes: [
                    [   player.getClothes(0)   ],
                    [   player.getClothes(1)   ],
                    [   player.getClothes(2)   ],
                    [   player.getClothes(3)   ],
                    [   player.getClothes(4)   ],
                    [   player.getClothes(5)   ],
                    [   player.getClothes(6)   ],
                    [   player.getClothes(7)   ],
                    [   player.getClothes(8)   ],
                    [   player.getClothes(9)   ],
                    [   player.getClothes(10)  ],
                    [   player.getClothes(11)  ]
                ],
                haircolor: [player.hairColor, player.hairHighlightColor],
            }
        }
        player.data.shared = {...playerData.shared}
        
        mp.database.Players.update({ data: JSON.stringify(playerData) }, {
            where: {
                identifier: player.shared.identifier
            }
        })
    }
    
    player.load = async (email) => {
        if (player.shared.loaded) return
        const { data, identifier, role } = await mp.database.Players.findOne({
            where: {
                email: email
            }
        })
        
        if(player && data) {
            const playerData = JSON.parse(data)
            const { internal, shared } = playerData;

            // Essentials vars
            player.name = identifier
            player.health = internal.health
            player.armour = internal.armor
            player.heading = internal.heading
            player.position = internal.position
            player.dimension = internal.dimension


            // Shared & Internal
            player.shared = shared
            player.internal = internal
              
            
            // Append Shared & Internal
            player.internal.role = role
            player.shared.identifier = identifier


            for (const weapon in internal.allWeapons) {
                player.giveWeapon(Number(weapon), internal.allWeapons[weapon]);
            }
            
            await mp.utils.wait(1000)
            if (internal.lastVehicle) {
                mp.vehicles.forEach(async vehicle => {
                    if (vehicle.numberPlate === internal.lastVehicle?.numberPlate) player.putIntoVehicle(vehicle, internal.lastVehicle?.seat)
                })
            }
            
            shared.clothes.forEach((clothes, index) => {
                player.setClothes(parseInt(index), parseInt(clothes[0].drawable) , parseInt(clothes[0].texture), 0)
            })
        }

        mp.players.forEach(_player => {
            if (_player.id !== player.id) {
                if (_player.shared.identifier === identifier) {
                    _player.notify('Someone has logged in with your account')
                    _player.kickSilent();
                }
            }
        })

        player.shared.loaded = true
        player.data.shared = {...player.shared}
        player.call('login:disable')
        player.call('userLoaded')
    }

    player.logout = async() => {
        if (player.shared || player.internal) player.save()
        player.shared = {loaded: false}
        player.internal = {}
        player.dimension = player.id + 5000
        player.call('login:enable')
    }

    player.exist = async (email) => {
        const PlayerDB = await mp.database.Players.findOne({
            where: {
                email: email
            }
        })
        
        if (PlayerDB) return PlayerDB
        return false
    }

    player.spawnVehicle = (vehicle, position, heading) => {
        if (vehicle) {
            const veh = mp.vehicles.new(mp.joaat(vehicle), new mp.Vector3(position), {
                heading,
                numberPlate: mp.utils.generateNumberPlate(),
                dimension: player.dimension
            })

            player.putIntoVehicle(veh, 0);
            veh.vehicleKey = shortId.generate();
            veh.vehicleCreator = player.shared.identifier;
            veh.position = {x: position.x, y: position.y, z: position.z - 0.3};
            player.shared.vehicleKeys[veh.vehicleKey] = {
                vehicleKey: veh.vehicleKey,
                vehicleCreator: player.shared.identifier,
                vehicleNumberPlate: veh.numberPlate
            };
            Instantiate(veh)
        } else player.notify('Vehicle not found.');
    }

    player.repairVehicle = () => {
        if (player.vehicle) {
            player.vehicle.repair();
            player.notify('Vehicle repaired.');
        } else player.notify('You are not in a vehicle.');
    }

    player.deleteVehicle = () => {
        if(player.vehicle) {
            const {vehicle} = player
            Remove(vehicle)
            vehicle.destroy(), player.notify('Vehicle Deleted.');
        }
        player.notify('You are not in a vehicle.');
    }
})