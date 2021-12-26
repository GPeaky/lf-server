mp.core.Garages = []

mp.core.Garage = class {

    createBlip(){
        mp.blips.new(357, this.entryPos,
            { name: "Garaje", scale: 0.7, color: 2 }    
        )
    }

    createMarker(){
        this.label = new mp.core.Label("Pulsa ~y~E~s~ para abrir el garaje", this.entryPos,
            {
                los: false,
                font: 2,
                drawDistance: 10,
            },
            {
                key: 0x45,
                coords: {x: this.entryPos.x, y: this.entryPos.y, z: this.entryPos.z, width: 2.5, height: 2.5, dimension: 0},
                callback: player => {
                    if (!player.vehicle) return
                    const vehicle = player.vehicle
                    vehicle.position = this.garagePos
                    player.heading = this.heading
                }
            }
        )

        this.marker = mp.markers.new(1, new mp.Vector3(this.entryPos.x, this.entryPos.y, this.entryPos.z - 1.5), 1.5,
            {
                direction: this.entryPos,
                rotation: 0,
                color: [255, 255, 255, 255],
                visible: true,
                dimension: 0
            }
        )
    }

    constructor({ entryPos, exitPos, garagePos, heading }) {
        this.entryPos = entryPos
        this.exitPos = exitPos
        this.garagePos = garagePos
        this.heading = heading
        mp.core.Garages[this.id] = this     
        this.createBlip()   
        this.createMarker()
    }

}

