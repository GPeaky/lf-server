const { parse } = require('dotenv');
const Vehicles = require('../../database/models/Vehicles');

const Instantiate = vehicle => {
    const vehicleData = JSON.stringify({
        position: vehicle.position,  
        color: vehicle.getColorRGB(),
        dimension: vehicle.dimension,
        heading: vehicle.heading,
        engineHealth: vehicle.engineHealth,
        bodyHealth: vehicle.bodyHealth,
        locked: vehicle.locked
    })
    Vehicles.create({
        id: vehicle.numberPlate,
        model: vehicle.model,
        data: vehicleData,
    })
    vehicle.isPersistent = true
}

const Save = vehicle => {
    const vehicleData = JSON.stringify({
        position: vehicle.position,  
        color: vehicle.getColorRGB(),
        dimension: vehicle.dimension,
        heading: vehicle.heading,
        engineHealth: vehicle.engineHealth,
        bodyHealth: vehicle.bodyHealth,
        locked: vehicle.locked
    })
    Vehicles.update({ data: vehicleData }, {
        where: {
            id: vehicle.numberPlate
        }
    })
}

const Remove = vehicle => {
    console.log(`Vehicle with ID: ${vehicle.numberPlate} removed.`)
    Vehicles.destroy({
        where: {
            id: vehicle.numberPlate
        }
    })
}

const spawnVehicle = ({ id, model, data }) => {
    const vehicleData = JSON.parse(data)
    const vehicle = mp.vehicles.new(Number(model), vehicleData.position, {
        engine: false,
        heading: vehicleData.heading,
        dimension: vehicleData.dimension,
        numberPlate: id,
        locked: vehicleData.locked
    })
    
    vehicle.engineHealth = parseFloat(vehicleData.engineHealth)
    vehicle.bodyHe = parseFloat(vehicleData.bodyHealth)
    
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

module.exports = {Instantiate, Save, Remove}

// VehicleSaver
require('./VehicleSaver')