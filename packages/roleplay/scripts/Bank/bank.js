mp.core.Banks = []

mp.core.Bank = class {

    createBlip(){
        mp.blips.new(728, this.pos,
            { name: this.blipName, scale: 0.7, color: 24 }    
        )
    }

    createMarker() {
        this.label = new mp.core.Label("Pulsa ~y~E~s~ para interactuar", this.pos,
        {
                los: false,
                font: 2,
                drawDistance: 10,
            },
            {
                key: 0x45,
                coords: {x: this.pos.x, y: this.pos.y, z: this.pos.z, width: 5.0, height: 5.0, dimension: this.dimension},
                callback: async player => {
                    player.notify('Your Bank Information', `You can withdraw ${player.shared.balance} of $ELP`)
                    player.notify('Bank Command', `Use /withdraw <amount> to withdraw money to your account`)
                }
            }
        )


        this.marker = mp.markers.new(1, new mp.Vector3(this.pos.x, this.pos.y, this.pos.z - 1.5), 1.5,
            {
                direction: this.pos,
                rotation: 0,
                color: [255, 255, 255, 255],
                visible: true,
                dimension: 0
            }
        )
    }

    constructor({ pos, dimension, blipName = 'Bank' }, id ) {
        this.pos = pos
        this.id = id
        this.blipName = `${blipName} [Exchange]`
        mp.core.Banks[id] = this     
        this.createBlip()   
        this.createMarker()
    }

}