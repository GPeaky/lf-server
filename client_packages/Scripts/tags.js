mp.nametags.enabled = false;

const maxDistance = 25*25

mp.events.add('render', nametags => {
    const { graphics } = mp.game

    nametags.forEach(nameTag => {
        const [player, x, y, distance] = nameTag
        if (distance > maxDistance) return

        graphics.drawText(player.name, [x, y], {
            font: 4,
            color: [ 255, 255, 255, 255 ],
            scale: [0.2, 0.2],
            outline: true
        })
    })
})