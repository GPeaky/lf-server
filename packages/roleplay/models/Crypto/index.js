/* eslint-disable no-async-promise-executor */
const Web3 = require('web3')

mp.crypto = {}
mp.crypto.web3 = new Web3('wss://speedy-nodes-nyc.moralis.io/7f07f273e70e36b7caee16d9/bsc/testnet/ws')

mp.crypto.contractAddress = '0x0d3cD21697F0a2defBa083e5B09BACE2b4Eee5B9'
mp.crypto.contractABI = [{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"playerWallet","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendRewardsToPlayer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"fee","type":"uint8"}],"name":"setTransactionFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
mp.crypto.accountSecret = 'e1d97451b0d89d38d3c1f324e880b97b03fc2779c6a5805175f88e6e01b775d2'

mp.crypto.Transfer = async (to, amount, playerId) => {
    return new Promise(async resolve => {
        mp.crypto.nonce++; const cachedNonce = mp.crypto.nonce;
        const Transaction = await mp.database.Transactions.create({
            _id: `${cachedNonce}-${playerId}`,
            wallet: to,
            amountWei: amount,
            amountParsed: mp.crypto.web3.utils.fromWei(amount, 'ether'),
            nonce: cachedNonce,
            type: 'reward',
        }) 
        mp.crypto.contract.methods.sendRewardsToPlayer(to, amount).send({from : mp.crypto.account.address, gas: 300000, nonce: cachedNonce})
            .on("transactionHash", (hash) => {
                console.log(`Transaction Hash generated: ${hash} for ID: ${playerId}-${cachedNonce}`)
                Transaction.id = hash
                Transaction.status = 'pending'
                Transaction.save()
            })
            .on("receipt", (receipt) => {
                console.log(`Receipt: ${playerId}-${cachedNonce} - ${receipt.transactionHash}`)
                Transaction.id = receipt.transactionHash
                Transaction.status = 'success'
            })
            .on("confirmation", (confirmation) => {
                console.log(`Confirmation #${confirmation} for ID: ${playerId}-${cachedNonce}`);
                Transaction.confirmations = confirmation
                if (confirmation >= 3) {
                    Transaction.status = 'confirmed'
                    Transaction.save()
                    return resolve(true)
                }
                Transaction.save()
            })
            .on("error", async () => {
                console.log(`Error for ID: ${playerId}-${cachedNonce}`);
                Transaction.status = 'failed'
                Transaction.save()
                return resolve(false)
            });
    })
}

const Init = async () => {
    mp.crypto.contract = await new mp.crypto.web3.eth.Contract(mp.crypto.contractABI, mp.crypto.contractAddress)

    mp.crypto.account = await mp.crypto.web3.eth.accounts.privateKeyToAccount(mp.crypto.accountSecret);
    mp.crypto.web3.eth.accounts.wallet.add(mp.crypto.account.privateKey)
    mp.crypto.nonce = await mp.crypto.web3.eth.getTransactionCount(mp.crypto.account.address, 'pending') - 1

    mp.crypto.contract.events.Transfer({ filter: {value: []},  fromBlock: 'latest',})
        .on('data', async (event) => {
            if (event.returnValues.to !== mp.crypto.contractAddress) return
            const playerDB = await mp.database.Players.getPlayerByWallet(event.returnValues.from)
            if (!playerDB?.wallet) return
            const Transaction = await mp.database.Transactions.create({
                _id: event.transactionHash,
                wallet: event.returnValues.from,
                amountWei: event.returnValues.value,
                amountParsed: mp.crypto.web3.utils.fromWei(event.returnValues.value, 'ether'),
                nonce: playerDB.email,
                type: 'deposit',
            })
            console.log(playerDB.identifier)
            const playerConnected = await mp.players.getByIdentifier(playerDB.identifier);
            const awaitConfirmationInterval = setInterval(async () => {
                const tx = await mp.crypto.web3.eth.getTransaction(event.transactionHash)
                const currentBlock = await mp.crypto.web3.eth.getBlockNumber(); const currentConfirmations = currentBlock - tx.blockNumber
                if (currentConfirmations > 8) {
                    clearInterval(awaitConfirmationInterval)
                    Transaction.confirmations = currentConfirmations,
                    Transaction.status = 'confirmed'
                    Transaction.save()
                    const playerDB = await mp.database.Players.getPlayerByWallet(event.returnValues.from)
                    console.log(`tX Approved, Player: ${playerDB.email} deposited ${mp.crypto.web3.utils.fromWei(event.returnValues.value, 'ether')}ELP CONFIRMED With ${currentConfirmations} blocks`)
                    if (!playerConnected) return mp.database.Players.update({ balance: Number(playerDB.balance) + Number(event.returnValues.value) }, {
                        identifier: playerDB.shared.identifier
                    });
                    mp.players.at(playerConnected.id).shared.balance = Number(playerConnected.shared.balance) + Number(event.returnValues.value)
                    playerConnected.notify(`You have successfully deposited ${mp.crypto.web3.utils.fromWei(event.returnValues.value, 'ether')}ELP into your account.`)
                } else {
                    Transaction.confirmations = currentConfirmations,
                    Transaction.save()
                    console.log(`Awaiting for confirmation for Player: ${playerDB.email}, tX: ${event.transactionHash} Current confirmations: ${currentConfirmations}`)
                    if (playerConnected) playerConnected.notify(`Your transaction with value ${mp.crypto.web3.utils.fromWei(event.returnValues.value, 'ether')} is validating, confirmations: ${currentConfirmations}.`)
                }
            }, 5000)
        })
        .on('error', async (error) => {
            console.log(`Error: ${error}`)
        })
        .on('connected', async (event) => {
            console.log(`Connected to: ${event}`)
        })
}

Init()