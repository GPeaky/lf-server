const LastVehicleData = {}

const UpdateCache = (vehicle, vehicleData) => LastVehicleData[vehicle.numberPlate] = {vehicleData, vehicle}

// mp.database.Vehicles.create({
//     _id: '222222',
//     data: { pep: 'pepe' },
//     model: 'LAMBO',
// })

const Instantiate = vehicle => {
    if (vehicle.isPersistent) return
    const vehicleData = {
        deformationMap: '{}',
        heading: vehicle.heading,
        position: vehicle.position,  
        color: vehicle.getColorRGB(),
        dimension: vehicle.dimension,
        bodyHealth: vehicle.bodyHealth,
        engineHealth: vehicle.engineHealth,
        fuel: vehicle.fuel || 100,
        vehicleCreator: vehicle.vehicleCreator
    }
    
    mp.database.Vehicles.create({
        _id: vehicle.numberPlate,
        data: vehicleData,
        model: vehicle.model,
    })
    vehicle.userInSeat = false
    vehicle.isPersistent = true
    vehicle.deformationMap = '{}'
    UpdateCache(vehicle, vehicleData)
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
        bodyHealth: vehicle.bodyHealth,
        engineHealth: vehicle.engineHealth,
        vehicleCreator: vehicle.vehicleCreator,
        fuel: vehicle.fuel || 100,
        deformationMap: vehicle.deformationMap || '{}',
    };

    if (!vehicle.userInSeat) {
        vehicleData.engineHealth = cachedVehicleData.engineHealth
        vehicleData.bodyHealth = cachedVehicleData.bodyHealth
    }

    // I willl made a change so the server will automaticly restart CTRL + s

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
        if (cachedVehicleData.fuel != vehicleData.fuel) {
            vehicle.data.fuel = vehicleData.fuel
            changes.push(`${cachedVehicleData.fuel} > ${vehicleData.fuel} fuel`)
        }
        
        if (changes.length <= 0) return
    }
    
    mp.database.Vehicles.findByIdAndUpdate(vehicle.numberPlate, {
        data: vehicleData
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
    if( vehicle.exposition ) {
        player.call('controller:vehicle:exposition', [vehicle])
        return
    }

    if (vehicle.job || vehicle.rented || player.shared.vehicleKeys[vehicle.numberPlate]) return true

    player.notify(`You don't have access to this vehicle.`)
    player.removeFromVehicle()
});

mp.events.addCommand('giveKeys', async (player, _playerId) => {
    const _player = mp.players.at(_playerId)
    if (!player.vehicle) return player.notify(`You don't have a vehicle.`)
    if (!_player) return player.notify(`Player with ID: ${_playerId} not found.`)
    if (!player.shared.vehicleKeys[player.vehicle.numberPlate].isOwner) return player.notify(`You are not the owner of this vehicle`)
    if (_player.shared.vehicleKeys[player.vehicle.numberPlate]) return player.notify('This user already has the keys')

    _player.shared.vehicleKeys[player.vehicle.numberPlate] = {
        vehicleCreator: _player.shared.identifier,
        isOwner: false
    }

    player.notify(`You gave ${_player.name} the keys of your vehicle.`)
    _player.notify(`${player.name} gave you the keys of your vehicle.`)
})

mp.events.add("playerStartExitVehicle", async player => {
    player.vehicle.userInSeat = false
});

const Remove = vehicle => {
    console.log(`Vehicle with ID: ${vehicle.numberPlate} removed.`)
    mp.database.Vehicles.deleteOne({
        id: vehicle.numberPlate
    })
}

const spawnVehicle = ({ id, model, data: vehicleData }) => {
    const vehicle = mp.vehicles.new(Number(model), vehicleData.position, {
        engine: false,
        numberPlate: id,
        locked: vehicleData.locked,
        heading: vehicleData.heading,
        dimension: vehicleData.dimension,
    })
    
    vehicle.isPersistent = true
    vehicle.fuel = vehicleData.fuel || 100
    vehicle.vehicleCreator = vehicleData.vehicleCreator
    vehicle.deformationMap = vehicleData.deformationMap

    UpdateCache(vehicle, vehicleData)
}

(async() => {
    for await (const vehicle of await mp.database.Vehicles.find({})) {
        spawnVehicle(vehicle)
    }  
})()

module.exports = { Instantiate, Save, Remove }

// VehicleSaver
require('./VehicleSaver')