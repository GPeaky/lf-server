const Vehicles = require('../../database/models/Vehicles');

const Instantiate = async vehicle => {
    Vehicles.create({
        model: vehicle.model,
        data: 'test'
    })
}

const main = async() => {
    const result = await Vehicles.findAll({
        where: {
            id: 1
        }
    })
    for await (const item of result) {

    }
} 

main()

module.exports = {
    Instantiate
}