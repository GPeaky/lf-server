mp.core.Garages = []

mp.core.Garage = class {

    createBlip(){
        mp.blips.new(357, this.entryPos,
            { name: "Garaje", scale: 0.7, color: 2 }    
        )
    }

    createMarker(){
        this.entrys = {
            cars: [
                {
                    label: new mp.core.Label("Pulsa ~y~E~s~ para entrar al garaje", this.entryPos,
                    {
                            los: false,
                            font: 2,
                            drawDistance: 10,
                        },
                        {
                            key: 0x45,
                            coords: {x: this.entryPos.x, y: this.entryPos.y, z: this.entryPos.z, width: 5.0, height: 5.0, dimension: 0},
                            callback: async player => {
                                if (!player.vehicle) return player.position = this.garagePos, player.dimension = this.dimension;
                                const vehicle = player.vehicle
                                const cachedId = vehicle.id
                                player.vehicle.position = this.garagePos
                                player.heading = this.interiorHeading
                                player.vehicle.dimension = this.dimension
                                vehicle.getOccupants().forEach(playerA => {
                                    playerA.call('fadeOut')
                                    if (playerA.id !== player.id) {
                                        let cachedSeat = playerA.seat
                                        playerA.dimension = this.dimension
                                        playerA.position = this.garagePos
                                        setTimeout(() => {
                                            playerA.putIntoVehicle(mp.vehicles.at(cachedId), cachedSeat)
                                            playerA.call('fadeIn')
                                        }, 1000)
                                    } else setTimeout(() => playerA.call('fadeIn'), 1250);
                                });
                            }
                        }
                    ),
        
                    marker: mp.markers.new(1, new mp.Vector3(this.entryPos.x, this.entryPos.y, this.entryPos.z - 1.5), 1.5,
                        {
                            direction: this.entryPos,
                            rotation: 0,
                            color: [255, 255, 255, 255],
                            visible: true,
                            dimension: 0
                        }
                    )
                },
            ],
            players: [
                {
                    label: new mp.core.Label("Pulsa ~y~E~s~ para entrar al garaje", this.entryPlayerPos, {
                            los: false,
                            font: 2,
                            drawDistance: 10,
                        },
                        {
                            key: 0x45,
                            coords: {x: this.entryPlayerPos.x, y: this.entryPlayerPos.y, z: this.entryPlayerPos.z, width: 5.0, height: 5.0, dimension: 0},
                            callback: async player => {
                                if (player.vehicle) return player.notify("No puedes entrar por esta entrada con un vehículo");
                                player.position = this.exits.players[Math.floor(Math.random() * this.exits.players.length)].label.position    
                                player.dimension = this.dimension                     
                            }
                        }
                    ),
        
                    marker: mp.markers.new(1, new mp.Vector3(this.entryPlayerPos.x, this.entryPlayerPos.y, this.entryPlayerPos.z - 1.5), 1.5,
                        {
                            direction: this.entryPlayerPos,
                            rotation: 0,
                            color: [255, 255, 255, 255],
                            visible: true,
                            dimension: 0
                        }
                    )
                }
            ]
        },

        this.exits = {
            cars: [
                {
                    blip: new mp.core.Blips({
                        name: "Salida para vehiculos",
                        short: false,
                        coords: { x: this.exitPos.x, y: this.exitPos.y, z: this.exitPos.z },
                        sprite: 791,
                        color: 11,
                        dimension: this.dimension
                    }),
                    label: new mp.core.Label("Pulsa ~y~E~s~ para salir del garaje", this.exitPos,
                    {
                        los: false,
                        font: 2,
                        drawDistance: 10,
                        dimension: this.dimension
                    },
                    {
                        key: 0x45,
                        coords: {x: this.exitPos.x, y: this.exitPos.y, z: this.exitPos.z, width: 5.0, height: 5.0, dimension: this.dimension},
                        callback: async player => {
                            if (!player.vehicle) return player.notify('No puedes salir por aquí sin un vehiculo, para ello debes de utilizar las salidas para civiles');
                            const vehicle = player.vehicle
                            const cachedId = vehicle.id
                            vehicle.dimension = 0
                            vehicle.position = this.garageOutsidePos
                            player.heading = this.outsideHeading
                            vehicle.getOccupants().forEach(playerA => {
                                playerA.call('fadeOut')
                                if (playerA.id !== player.id) {
                                    let cachedSeat = playerA.seat
                                    playerA.dimension = 0
                                    playerA.position = this.garageOutsidePos
                                    setTimeout(() => {
                                        playerA.putIntoVehicle(mp.vehicles.at(cachedId), cachedSeat)
                                        playerA.call('fadeIn')
                                    }, 1000)
                                } else setTimeout(() => playerA.call('fadeIn'), 1250);
                            });
                        }
                    }),
        
                    marker: mp.markers.new(1, new mp.Vector3(this.exitPos.x, this.exitPos.y, this.exitPos.z - 1.5), 1.5,
                        {
                            direction: this.exitPos,
                            rotation: 0,
                            color: [255, 255, 255, 255],
                            visible: true,
                            dimension: this.dimension
                        }
                    )
                },
            ],
            players: [
                {
                    blip: new mp.core.Blips({
                        name: "Salida para civiles",
                        short: false,
                        coords:{x: 1295.31, y: 217.53, z: -49.06 },
                        sprite: 515,
                        color: 43,
                        dimension: this.dimension          
                    }),
                    label: new mp.core.Label("Pulsa ~y~E~s~ para salir del garaje", new mp.Vector3(1295.31, 217.53, -49.06),
                    {
                        los: true,
                        font: 2,
                        drawDistance: 10,
                        dimension: this.dimension
                    },
                    {
                        key: 0x45,
                        coords: {x: 1295.31, y: 217.53, z: -49.06, width: 5.0, height: 5.0, dimension: this.dimension},
                        callback: async player => {
                            if (player.vehicle) return player.notify('No puedes salir por aquí con un vehiculo, para ello debes de utilizar las salidas para vehiculos');
                            player.position = this.garageOutsidePos, player.dimension = 0;
                        }
                    }),
        
                    marker: mp.markers.new(1, new mp.Vector3(1295.31, 217.53, -49.06 - 1.5), 1.5,
                        {
                            direction: new mp.Vector3(1295.31, 217.53, -49.06),
                            rotation: 0,
                            color: [255, 255, 255, 255],
                            visible: true,
                            dimension: this.dimension
                        }
                    )
                },
                {
                    blip: new mp.core.Blips({
                        name: "Salida para civiles",
                        short: false,
                        coords:{x: 1295.27, y: 264.52, z: -49.06 },
                        sprite: 515,
                        color: 43,
                        dimension: this.dimension            
                    }),
                    label: new mp.core.Label("Pulsa ~y~E~s~ para salir del garaje", new mp.Vector3(1295.27, 264.52, -49.06),
                    {
                        los: true,
                        font: 2,
                        drawDistance: 10,
                        dimension: this.dimension
                    },
                    {
                        key: 0x45,
                        coords: {x: 1295.27, y: 264.52, z: -49.06, width: 5.0, height: 5.0, dimension: this.dimension},
                        callback: async player => {
                            if (player.vehicle) return player.notify('No puedes salir por aquí con un vehiculo, para ello debes de utilizar las salidas para vehiculos');
                            player.position = this.garageOutsidePos, player.dimension = 0;
                        }
                    }),
        
                    marker: mp.markers.new(1, new mp.Vector3(1295.27, 264.52, -49.06 - 1.5), 1.5,
                        {
                            direction: new mp.Vector3(1295.27, 264.52, -49.06),
                            rotation: 0,
                            color: [255, 255, 255, 255],
                            visible: true,
                            dimension: this.dimension
                        }
                    )
                },
            ]
        }
    }

    constructor({ entryPos, exitPos, garagePos, garageOutsidePos, interiorHeading, outsideHeading, entryPlayerPos }, dimension) {
        this.entryPos = entryPos
        this.entryPlayerPos = entryPlayerPos
        this.exitPos = exitPos
        this.garagePos = garagePos
        this.garageOutsidePos = garageOutsidePos
        this.interiorHeading = interiorHeading
        this.outsideHeading = outsideHeading
        this.dimension = dimension
        mp.core.Garages[this.id] = this     
        this.createBlip()   
        this.createMarker()
    }

}