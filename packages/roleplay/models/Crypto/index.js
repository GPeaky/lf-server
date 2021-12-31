const Web3 = require('web3')

mp.crypto = {}
mp.crypto.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')

mp.crypto.contractAddress = '0x0d3cD21697F0a2defBa083e5B09BACE2b4Eee5B9'
mp.crypto.contractABI = [{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"playerWallet","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendRewardsToPlayer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"fee","type":"uint8"}],"name":"setTransactionFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
mp.crypto.accountSecret = 'e1d97451b0d89d38d3c1f324e880b97b03fc2779c6a5805175f88e6e01b775d2'


// 37,552.257259847656145683

const Transfer = async (to, amount, playerId) => {
    return new Promise(async resolve => {
        mp.crypto.nonce++; let cachedNonce = mp.crypto.nonce;
        const User = await mp.database.Transactions.create({
            id: `${cachedNonce}-${playerId}`,
            wallet: to,
            amountWei: amount,
            amountParsed: mp.crypto.web3.utils.fromWei(amount, 'ether'),
            nonce: cachedNonce,
            type: 'reward',
        }) 
        mp.crypto.contract.methods.sendRewardsToPlayer(to, amount).send({from : mp.crypto.account.address, gas: 300000, nonce: cachedNonce})
            .on("transactionHash", (hash) => {
                console.log(`Transaction Hash generated: ${hash} for ID: ${playerId}-${cachedNonce}`)
                User.id = hash
                User.status = 'pending'
                User.save()
            })
            .on("receipt", (receipt) => {
                console.log(`Receipt: ${playerId}-${cachedNonce} - ${receipt.transactionHash}`)
                User.id = receipt.transactionHash
                User.status = 'success'
            })
            .on("confirmation", (confirmation) => {
                console.log(`Confirmation #${confirmation} for ID: ${playerId}-${cachedNonce}`);
                User.confirmations = confirmation
                if (confirmation >= 3) {
                    User.status = 'confirmed'
                    User.save()
                    return resolve(true)
                }
                User.save()
            })
            .on("error", async (error) => {
                console.log(`Error for ID: ${playerId}-${cachedNonce}`);
                User.status = 'failed'
                User.save()
                return resolve(false)
            });
    })
}

const Init = async () => {
    mp.crypto.contract = await new mp.crypto.web3.eth.Contract(mp.crypto.contractABI, mp.crypto.contractAddress)
    
    mp.crypto.account = await mp.crypto.web3.eth.accounts.privateKeyToAccount(mp.crypto.accountSecret);
    mp.crypto.web3.eth.accounts.wallet.add(mp.crypto.account.privateKey)
    mp.crypto.nonce = await mp.crypto.web3.eth.getTransactionCount(mp.crypto.account.address, 'pending') - 1
    let status = await Transfer('0x9D64847BFBEAA3F59b798Ef0927045a611cfC3a1', mp.crypto.web3.utils.toWei('1', 'ether'), 'NACHO')
    console.log(status)
    status = await Transfer('0x9D64847BFBEAA3F59b798Ef0927045a611cfC3a1', mp.crypto.web3.utils.toWei('1', 'ether'), 'NACHO')
    console.log(status)
    status = await Transfer('0x9D64847BFBEAA3F59b798Ef0927045a611cfC3a1', mp.crypto.web3.utils.toWei('1', 'ether'), 'NACHO')
    console.log(status)
    status = await Transfer('0xeFB0eB0911726cd6ed3B4b3e3d35793d4fC518fE', mp.crypto.web3.utils.toWei('1', 'ether'), 'PEAKY')
    console.log(status)
    status = await Transfer('0xeFB0eB0911726cd6ed3B4b3e3d35793d4fC518fE', mp.crypto.web3.utils.toWei('1', 'ether'), 'PEAKY')
    console.log(status)
    status = await Transfer('0xeFB0eB0911726cd6ed3B4b3e3d35793d4fC518fE', mp.crypto.web3.utils.toWei('1', 'ether'), 'PEAKY')
    console.log(status)
    status = await Transfer('0xeFB0eB0911726cd6ed3B4b3e3d35793d4fC518fE', mp.crypto.web3.utils.toWei('1', 'ether'), 'PEAKY')
    console.log(status)
}

Init()