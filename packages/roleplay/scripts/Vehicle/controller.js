const Vehicles = require('../../database/models/Vehicles');
const LastVehicleData = {}

const UpdateCache = (vehicle, vehicleData) => LastVehicleData[vehicle.numberPlate] = {vehicleData, vehicle}

const Instantiate = vehicle => {
    if (vehicle.isPersistent) return
    const vehicleData = JSON.stringify({
        position: vehicle.position,  
        color: vehicle.getColorRGB(),
        dimension: vehicle.dimension,
        heading: vehicle.heading,
        engineHealth: vehicle.engineHealth,
        bodyHealth: vehicle.bodyHealth,
        locked: vehicle.locked,
        deformationMap: '{}',
    })
    Vehicles.create({
        id: vehicle.numberPlate,
        owner: vehicle.owner,
        model: vehicle.model,
        data: vehicleData,
    })
    vehicle.isPersistent = true
    vehicle.userInSeat = false
    vehicle.deformationMap = '{}'
    UpdateCache(vehicle, JSON.parse(vehicleData))
}

const ClientSync = vehicle => {
    const vehicleData = LastVehicleData[vehicle.numberPlate]?.vehicleData; if (!vehicleData) return;
    mp.players.call('vehicleSync::Client', [vehicle.id, vehicleData])
}

const Save = async vehicle => {
    const cachedVehicleData = LastVehicleData[vehicle.numberPlate]?.vehicleData

    const vehicleData = {
        position: vehicle.position,  
        color: vehicle.getColorRGB(),
        dimension: vehicle.dimension,
        heading: vehicle.heading,
        engineHealth: vehicle.engineHealth,
        bodyHealth: vehicle.bodyHealth,
        locked: vehicle.locked,
        deformationMap: vehicle.deformationMap || '{}'
    };

    if (!vehicle.userInSeat) {
        vehicleData.engineHealth = cachedVehicleData.engineHealth
        vehicleData.bodyHealth = cachedVehicleData.bodyHealth
    }

    console.log(vehicle.userInSeat)

    if (cachedVehicleData) {
        const changes = []
        if (cachedVehicleData.position?.x != vehicleData.position?.x) changes.push(`${cachedVehicleData.position?.x} > ${vehicleData.position?.x} position x`)
        if (cachedVehicleData.position?.y != vehicleData.position?.y) changes.push(`${cachedVehicleData.position?.y} > ${vehicleData.position?.y} position y`)
        if (cachedVehicleData.position?.z != vehicleData.position?.z) changes.push(`${cachedVehicleData.position?.z} > ${vehicleData.position?.z} position z`)
        if (cachedVehicleData.dimension != vehicleData.dimension) changes.push(`${cachedVehicleData.dimension} > ${vehicleData.dimension} dimension`)
        if (cachedVehicleData.heading != vehicleData.heading) changes.push(`${cachedVehicleData.heading} > ${vehicleData.heading} heading`)
        if (cachedVehicleData.engineHealth != vehicleData.engineHealth) changes.push(`${cachedVehicleData.engineHealth} > ${vehicleData.engineHealth} engineHealth`)
        if (cachedVehicleData.bodyHealth != vehicleData.bodyHealth) changes.push(`${cachedVehicleData.bodyHealth} > ${vehicleData.bodyHealth} bodyHealth`)
        if (cachedVehicleData.locked != vehicleData.locked) changes.push(`${cachedVehicleData.locked} > ${vehicleData.locked} locked`)
        
        if (changes.length <= 0) return
        console.log(`Changed vehicle ${vehicle.numberPlate} changes: `, changes)
    }
    
    Vehicles.update({ data: JSON.stringify(vehicleData) }, {
        where: {
            id: vehicle.numberPlate
        }
    })

    UpdateCache(vehicle,vehicleData)
}

mp.events.add("setVehicleDeformationMap", (player, deformationMap) => {
    const vehicle = player?.vehicle
    vehicle.deformationMap = JSON.parse(deformationMap)
})

/*const IsPlayerOwner = (player, {owner}) => {
    if(owner != player.identifier) player.removeFromVehicle()
}*/

const PlayerHasKey = (player, veh) => {
    Keys.findOne({
        where: {
            plate: veh.numberPlate,
        }
    }).then(key => {
        key = JSON.parse(key?.dataValues.owners)
        if(key?.indexOf(player.identifier) != -1) return
        const ocupants = veh.getOccupants()
        if(ocupants.length > 0) {
            for(let i = 0; i < ocupants.length; i++) {
                if(key?.indexOf(ocupants[i].identifier) != -1) {
                    console.log(`Player ${player.name} has key for vehicle ${veh.numberPlate}`)
                    return
                }
            }
        }
        player.removeFromVehicle()
    })            
}

mp.events.add("playerStartEnterVehicle", async (player, vehicle, seat) => {
    if (seat != 0) return
    console.log(`${player.id} entering ${vehicle.numberPlate} seat ${seat}`)
    // PlayerHasKey(player, vehicle)
    ClientSync(vehicle)
    vehicle.userInSeat = true
});

mp.events.add("playerStartExitVehicle", async player => {
    console.log(`${player.id} exiting ${player.vehicle.numberPlate}`)
    player.vehicle.userInSeat = false
});


const Remove = vehicle => {
    console.log(`Vehicle with ID: ${vehicle.numberPlate} removed.`)
    Vehicles.destroy({
        where: {
            id: vehicle.numberPlate
        }
    })
}

const spawnVehicle = ({ id, owner, model, data }) => {
    const vehicleData = JSON.parse(data)
    const vehicle = mp.vehicles.new(Number(model), vehicleData.position, {
        engine: false,
        heading: vehicleData.heading,
        dimension: vehicleData.dimension,
        numberPlate: id,
        locked: vehicleData.locked
    })

    vehicle.isPersistent = true
    vehicle.owner = owner
    vehicle.deformationMap = vehicleData.deformationMap
    console.log(`Vehicle with ID: ${id} spawned.`)
    UpdateCache(vehicle, vehicleData)
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