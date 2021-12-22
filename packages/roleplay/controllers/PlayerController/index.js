const Player = require('../../database/models/Players');

const CreatePlayer = async (player) => {

    await mp.core.wait(750)

    player.position = new mp.Vector3(-61.71 , -1218.14 , 28.7);

    player.heading = 248.88;
    player.dimension = 0;
    player.health = 100;

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

    await mp.core.wait(150)

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

    Player.create({
        id: player.serial,
        name: player.name,
        email: "player.email",
        password: "player.password",
        data: playerData
    })


}

const SavePlayer = (player) => {
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
    Player.update({ data: playerData }, {
        where: {
            id: player.serial
        }
    })
}

const ExistPlayer = async(player) => {
    const PlayerDB = await Player.findOne({
        where: {
            id: player.serial
        }
    })
    
    if(PlayerDB) {
        return true
    } else {
        return false
    }
}

const LoadPlayer = async (player) => {
    const {data} = await Player.findOne({
        where: {
            id: player.serial
        }
    })

    if(player && data) {

        await mp.core.wait(750)

        const playerData = JSON.parse(data)
                
        player.position = playerData.position
        player.dimension = playerData.dimension
        player.heading = playerData.heading
        player.health = playerData.health
        player.armour = playerData.armor

        playerData.clothes.forEach((clothes, index) => {
            // console.log(index, clothes)
            player.setClothes(parseInt(index), parseInt(clothes[0].drawable) , parseInt(clothes[0].texture), 0)
        })

        // player.setHairColor(playerData.haircolor[0], playerData.haircolor[1]) TODO: Fix this (null, null)
    }
}

module.exports = { CreatePlayer, SavePlayer, ExistPlayer, LoadPlayer }

require('./PlayerSaver')