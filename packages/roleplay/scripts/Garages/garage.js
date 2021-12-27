mp.core.Garages = []

mp.core.Garage = class {

    createBlip(){
        mp.blips.new(357, this.entryPos,
            { name: "Garaje", scale: 0.7, color: 2 }    
        )
    }

    createMarker(){
        this.entry = {
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

        this.exit = {
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
                    if (!player.vehicle) return player.position = this.garageOutsidePos, player.dimension = 0;
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
        }
    }

    constructor({ entryPos, exitPos, garagePos, garageOutsidePos, interiorHeading, outsideHeading }, dimension) {
        this.entryPos = entryPos
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