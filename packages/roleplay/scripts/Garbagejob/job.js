module.exports = class Garbagejob {
    constructor(startSettings) {
        this.working = {}
        this.makeStartPoint(startSettings)
    }

    createVehicle(player, startSettings) {
        const veh = mp.vehicles.new(mp.joaat('biff'), startSettings.vehiclePos,
        {
            heading: startSettings.vehicleHeading,
            numberPlate: "numberPlate",
            alpha: 255,
            color: [[0, 0, 0], [0, 0, 0]],
            locked: false,
            engine: false,
            dimension: 0
        });
        player.call('job:garbage:started', [veh.id])
    }

    makeStartPoint(startSettings) {
        const startPointLabel = new mp.core.Label("Pulsa ~y~E~s~ para salir del garaje", startSettings.exitPos,
        {
            los: false,
            font: 2,
            drawDistance: 10,
            dimension: startSettings.dimension
        },
        {
            key: 0x45,
            coords: {x: startSettings.x, y: startSettings.y, z: startSettings.z, width: 5.0, height: 5.0, dimension: startSettings.dimension},
            callback: async player => {
                if (this.working[player.identifier] != true) {
                    this.createVehicle(player, startSettings)
                    this.working[player.identifier] = true
                }
            }
        });

        const startPointMarker = mp.markers.new(1, new mp.Vector3(startSettings.x, startSettings.y, startSettings.z - 1.5), 1.5,
            {
                direction: startSettings.exitPos,
                rotation: 0,
                color: [255, 255, 255, 255],
                visible: true,
                dimension: startSettings.dimension
            }
        )
    }
}