require('./bank')

const banksConfig = [
    { // 1
        pos: new mp.Vector3(150.06, -1040.14, 29.37),
        dimension: 0,
        // blipName: 'CustomName'
    },
]

banksConfig.forEach((garageData, index) => {
    new mp.core.Bank(garageData, index)
})

mp.events.addCommand('withdraw', async(player, quantity) => {
    if (player.shared.wallet.length < 10) return player.notify('Bank', 'You dont have any wallet linked to your account');;
    banksConfig.forEach(async bank => {
        console.log(player.dist(bank.pos))
        if (player.dist(bank.pos) < 3) {
            if (player.shared.balance >= quantity) {
                player.shared.balance -= quantity
                await mp.utils.wait(1000)
                player.save()
                mp.crypto.Transfer(player.shared.wallet, quantity, player.shared.identifier)
                player.notify('Bank', `You withdraw ${quantity} of $ELP`)
            } else player.notify('Bank', `You don't have enough money`)
            
        } 
    })
})