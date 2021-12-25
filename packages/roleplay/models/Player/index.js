const { Instantiate, Remove } = require('../../scripts/Vehicle/controller')

mp.events.add('playerReady', player => {
    player.name = `${player.ip} - ${player.id} - ${player.socialClub}`

    // Player <=> Vehicles

    player.create = async(email, password) => {
        if (player.loaded) return
        await mp.utils.wait(750)
        
        player.position = new mp.Vector3(-61.71 , -1218.14 , 28.7);
        
        player.heading = 248.88;
        player.dimension = 0;
        player.health = 100;
        
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
        
        await mp.utils.wait(150)
        
        const playerData = JSON.stringify({
            position: player.position,
            dimension: player.dimension,
            heading: player.heading,
            health: 100,
            armor: 0,

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
            haircolor: [player.getHairColor, player.getHairHighlightColor],
        })
        
        console.log(player.name, email, password)

        mp.database.Players.create({
            username: player.name,
            email: email,
            password: password,
            data: playerData
        })
    }

    player.save = async () => {
        if (!player.loaded) return
        const { position, dimension, heading, health, armor, allWeapons } = player
        const playerData = { 
            position, dimension, heading, health, armor, allWeapons,
            lastVehicle: player.vehicle ? {numberPlate: player.vehicle.numberPlate, seat: player.seat} : false,
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
            haircolor: [player.getHairColor, player.getHairHighlightColor],
        }
        
        mp.database.Players.update({ data: JSON.stringify(playerData) }, {
            where: {
                username: player.username
            }
        })
    }
    
    player.load = async (email) => {
        if (player.loaded) return
        const { data, username, role } = await mp.database.Players.findOne({
            where: {
                email: email
            }
        })
        
        if(player && data) {
            const playerData = JSON.parse(data)
            const { position, dimension, heading, health, armor, allWeapons } = playerData;

            player.role = role
            player.armour = armor
            player.name = username
            player.health = health
            player.heading = heading
            player.username = username
            player.position = position
            player.dimension = dimension

            for (const weapon in allWeapons) {
                player.giveWeapon(Number(weapon), allWeapons[weapon]);
            }
            
            await mp.utils.wait(1000)
            if (playerData.lastVehicle) {
                mp.vehicles.forEach(async vehicle => {
                    if (vehicle.numberPlate === playerData.lastVehicle?.numberPlate) player.putIntoVehicle(vehicle, playerData.lastVehicle?.seat)
                })
            }
            
            playerData.clothes.forEach((clothes, index) => {
                player.setClothes(parseInt(index), parseInt(clothes[0].drawable) , parseInt(clothes[0].texture), 0)
            })
        }

        mp.players.forEach(_player => {
            if (_player.id !== player.id) {
                if (_player.username === username) {
                    player.notify('Someone has logged in with your account')
                    player.kickSilent();
                }
            }
        })

        player.loaded = true
        player.call('login:disable')
        require('../../commands/superUser')(player)
    }

    player.logout = async() => {
        player.save()
        player.loaded = false
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

            veh.position = {x: position.x, y: position.y, z: position.z - 0.3};
            player.putIntoVehicle(veh, 0);
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
            Remove(player.vehicle)
            return player.vehicle.destroy(), player.notify('Vehicle Deleted.');
        }
        player.notify('You are not in a vehicle.');
    }
})