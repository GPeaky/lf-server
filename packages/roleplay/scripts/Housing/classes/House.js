mp.housing.House = class {
    constructor({ id, outsideDoorCoords, insideDoorCoords, type, owner }) {
        this.id = id;
        this.outsideDoorCoords = outsideDoorCoords
        this.insideDoorCoords = insideDoorCoords
        this.owner = owner

        this.Init()
    }

    async Init() {
        console.log(`Creating house #${this.id}`)
        new mp.core.Label("Pulsa ~y~E~s~", this.outsideDoorCoords,
            {
                los: false,
                font: 2,
                drawDistance: 10,
            },
            {
                key: 0x45,
                coords: {x: this.outsideDoorCoords.x, y: this.outsideDoorCoords.y, z: this.outsideDoorCoords.z, width: 5.0, height: 5.0, dimension: 0},
                callback: async player => {
                    player.position = this.insideDoorCoords
                }
            }
        )

        setTimeout(() => {
            new mp.core.Label("Pulsa ~y~E~s~", this.insideDoorCoords,
            {
                los: false,
                font: 2,
                drawDistance: 10,
            },
            {
                key: 0x45,
                coords: {x: this.insideDoorCoords.x, y: this.insideDoorCoords.y, z: this.insideDoorCoords.z, width: 5.0, height: 5.0, dimension: 0},
                callback: async player => {
                    player.position = this.outsideDoorCoords
                }
            }
        )
        }, 500);
    }


}