mp.core = {}

mp.core.wait = async(ms) => new Promise((resolve) => setTimeout(resolve, ms));

mp.core.Label = class {
    constructor(text, position, options={}, keyOptions=null) {
        this.text = text;
        this.position = position;
        this.options = options;
        this.inColshape = false;
        if(keyOptions){
            const { key, coords, callback } = keyOptions;
            this.key = key;
            this.coords = coords;
            this.callback = callback;
            this.colshape = mp.colshapes.newRectangle(this.coords.x, this.coords.y, this.coords.width, this.coords.height, this.coords.dimension)
            console.log(this.colshape)
            this.initKey();
        }
    }

    initKey() {
        
        const playerEnterColshapeHandler = (player, shape) => {
            console.log("Player enter colshape", shape, this.colshape, shape == this.colshape);
            if(shape == this.colshape) {
                this.inColshape = true;
                console.log("Closhape", this.colshape);
            }
        }
          
        mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

        const playerExitColshapeHandler = (player, shape) => {
            console.log("Player exit colshape", shape);
            if(shape == this.colshape) {
                this.inColshape = false;
                console.log("Closhape", this.colshape);
            }
        }

        mp.events.add("playerExitColshape", playerExitColshapeHandler);

        console.log(`Creating event to Keydown: ${this.key.toString(16)}`);

        mp.events.add(`Keyup::${this.key.toString(16)}`, (  ) => {
            console.log(this.key.toString(16))
            console.log(this.inColshape)
            if(this.inColshape) {
                this.callback()
            }
        });
    }

    draw() {
        mp.labels.new(this.text, this.position, this.options);
    }
}