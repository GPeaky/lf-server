import config from '@config/config'
import { customAlphabet } from "nanoid"
const nanoid = customAlphabet(config.utils.numberPlateAlphabet)

mp.utils = {
    wait: function (ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms))
    },

    setDefaultClothes(player: PlayerMp) {
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
    },

    generateNumberPlate(){
        return nanoid()
    },

    PlayerData(player: PlayerMp) {
        return {
            internal: {
                ...player.internal,
                health: player.health,
                armor: player.armour,
                heading: player.heading,
                position: player.position,
                dimension: player.dimension,
                allWeapons: player.allWeapons,
                lastVehicle: player.vehicle ? {
                    numberPlate: player.vehicle.numberPlate,
                    seat: player.seat
                } : false
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

                hairColor: [
                    player.hairColor,
                    player.hairHighlightColor
                ]
            }
        }
    }
}