mp.nametags.enabled = false;

const maxDistance = 25*25

mp.events.add('render', nametags => {
    const { graphics } = mp.game

    nametags.forEach(nameTag => {
        const [player, x, y, distance] = nameTag

        if (distance <= maxDistance) {
            let scale = (distance / maxDistance)
            if (scale < 0.6) scale = 0.6

            graphics.drawText(player.name, [x, y], {
                font: 4,
                color: [ 255, 255, 255, 255 ],
                scale: [0.4, 0.4],
                outline: true
            })
        }
    })
})