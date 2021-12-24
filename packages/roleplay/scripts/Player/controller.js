const SavePlayer = (player) => {
    if (!player.loaded) return

    const playerData = JSON.stringify({
        position: player.position,
        dimension: player.dimension,
        heading: player.heading,
        health: player.health,
        armor: player.armour,
        
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
    mp.database.Players.update({ data: playerData }, {
        where: {
            id: player.serial
        }
    })
}

const LoadPlayer = async (player) => {
    const { data } = await mp.database.Players.findOne({
        where: {
            id: player.serial
        }
    })

    if(player && data) {

        await mp.utils.wait(750)

        const playerData = JSON.parse(data)
                
        player.position = playerData.position
        player.dimension = playerData.dimension
        player.heading = playerData.heading
        player.health = playerData.health
        player.armour = playerData.armor
        player.loaded = true

        playerData.clothes.forEach((clothes, index) => {
            player.setClothes(parseInt(index), parseInt(clothes[0].drawable) , parseInt(clothes[0].texture), 0)
        })

        // player.setHairColor(playerData.haircolor[0], playerData.haircolor[1]) TODO: Fix this (null, null)
    }
}

module.exports = { SavePlayer, LoadPlayer }

require('./PlayerSaver')