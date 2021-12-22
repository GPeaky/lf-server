const Vehicles = require('../../database/models/Vehicles');

const Instantiate = vehicle => {
    vehicleData = JSON.stringify({
        position: vehicle.position,  
        color: vehicle.getColorRGB(),
        dimension: vehicle.dimension,
        heading: vehicle.heading
    })
    Vehicles.create({
        id: vehicle.numberPlate,
        model: vehicle.model,
        data: vehicleData,
    })
    vehicle.isPersistent = true
}

const Save = vehicle => {
    vehicleData = JSON.stringify({
        position: vehicle.position,  
        color: vehicle.getColorRGB(),
        dimension: vehicle.dimension,
        heading: vehicle.heading
    })
    Vehicles.update({ data: vehicleData }, {
        where: {
            id: vehicle.numberPlate
        }
    })
}

const spawnVehicle = ({ id, model, data }) => {
    const vehicleData = JSON.parse(data)
    const vehicle = mp.vehicles.new(mp.joaat(model), vehicleData.position, {
        engine: false,
        heading: vehicleData.heading,
        dimension: vehicleData.dimension,
        numberPlate: id,
    })
    vehicle.setColorRGB(vehicleData.color)
    vehicle.isPersistent = true
    console.log(`Vehicle with ID: ${id} spawned.`)
}

const bootVehicles = async() => {
    const result = await Vehicles.findAll({})
    for await (const vehicle of result) {
        spawnVehicle(vehicle)
    }  
}

bootVehicles()

module.exports = {Instantiate, Save}

// VehicleSaver
require('./VehicleSaver')