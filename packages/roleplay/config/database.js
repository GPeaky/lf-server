const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async() => {
    await prisma.$connect()
    mp.database = {
        Players : {
            ...prisma.players,

            getPlayerByWallet: async wallet => {
                return await prisma.players.findFirst({
                    where: {
                        wallet
                    },
                })
            }
        },
        Vehicles : prisma.vehicles,
        Transactions : prisma.transactions,
    }
}