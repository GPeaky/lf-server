const Vehicles = require('../../database/models/Vehicles');
const LastVehicleData = {}

const UpdateCache = (vehicle, vehicleData) => LastVehicleData[vehicle.numberPlate] = {vehicleData, vehicle}

const Instantiate = vehicle => {
    if (vehicle.isPersistent) return
    const vehicleData = JSON.stringify({
        deformationMap: '{}',
        heading: vehicle.heading,
        position: vehicle.position,  
        color: vehicle.getColorRGB(),
        dimension: vehicle.dimension,
        bodyHealth: vehicle.bodyHealth,
        vehicleKey: vehicle.vehicleKey,
        engineHealth: vehicle.engineHealth,
        vehicleCreator: vehicle.vehicleCreator
    })
    
    Vehicles.create({
        data: vehicleData,
        owner: vehicle.owner,
        model: vehicle.model,
        id: vehicle.numberPlate,
    })
    vehicle.userInSeat = false
    vehicle.isPersistent = true
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
        heading: vehicle.heading,
        position: vehicle.position,  
        color: vehicle.getColorRGB(),
        dimension: vehicle.dimension,
        vehicleKey: vehicle.vehicleKey,
        bodyHealth: vehicle.bodyHealth,
        engineHealth: vehicle.engineHealth,
        vehicleCreator: vehicle.vehicleCreator,
        deformationMap: vehicle.deformationMap || '{}',
    };

    if (!vehicle.userInSeat) {
        vehicleData.engineHealth = cachedVehicleData.engineHealth
        vehicleData.bodyHealth = cachedVehicleData.bodyHealth
    }

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
    }
    
    Vehicles.update({ data: JSON.stringify(vehicleData) }, {
        where: {
            id: vehicle.numberPlate
        }
    })

    UpdateCache(vehicle, vehicleData)
}

mp.events.add("setVehicleDeformationMap", (player, deformationMap) => {
    const vehicle = player?.vehicle
    vehicle.deformationMap = JSON.parse(deformationMap)
})

mp.events.add("playerStartEnterVehicle", async (player, vehicle, seat) => {
    if (seat != 0) return
    ClientSync(vehicle)
    vehicle.userInSeat = true
});

mp.events.add('playerStartEnterVehicle', (player, vehicle) => {
    if (player.vehicleKeys[vehicle.vehicleKey]) return true

    player.notify(`You don't have access to this vehicle.`)
    player.removeFromVehicle()
});

mp.events.addCommand('giveKeys', (player, _playerId) => {
    const _player = mp.players.at(_playerId)
    if ( player.vehicle ) {
        if ( _player ) {
            if ( player.vehicle.vehicleCreator == player.identifier ) {
                if (_player.vehicleKeys[player.vehicle.vehicleKey]) return player.notify('This user already has the keys')
                _player.vehicleKeys[player.vehicle.vehicleKey] = {
                    vehicleKey: player.vehicle.vehicleKey,
                    vehicleNumberPlate: player.vehicle.numberPlate,
                    vehicleCreator: player.vehicle.vehicleCreator,
                }
            } else
                player.notify(`You are not the owner of this vehicle `)
        } else 
            player.notify(`Player with ID: ${_playerId} not found.`)
    } else
        player.notify('You are not in a vehicle.')
})

mp.events.add("playerStartExitVehicle", async player => {
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

const spawnVehicle = ({ id, model, data }) => {
    const vehicleData = JSON.parse(data)
    const vehicle = mp.vehicles.new(Number(model), vehicleData.position, {
        engine: false,
        numberPlate: id,
        locked: vehicleData.locked,
        heading: vehicleData.heading,
        dimension: vehicleData.dimension,
    })
    
    vehicle.isPersistent = true
    vehicle.vehicleKey = vehicleData.vehicleKey
    vehicle.vehicleCreator = vehicleData.vehicleCreator
    vehicle.deformationMap = vehicleData.deformationMap
    console.log(`Vehicle with ID: ${id} spawned.`)

    UpdateCache(vehicle, vehicleData)
}

(async() => {
    const result = await Vehicles.findAll({})
    for await (const vehicle of result) {
        spawnVehicle(vehicle)
    }  
})()

module.exports = { Instantiate, Save, Remove }

// VehicleSaver
require('./VehicleSaver')