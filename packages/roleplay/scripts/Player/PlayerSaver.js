setInterval(() => {
    if(mp.players.length > 0) {
        mp.players.forEach(player => {
            player.save()
        })
        console.log(`Saved #${mp.players.length} Players`)
    }
}, 5000);