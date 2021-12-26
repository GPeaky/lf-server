mp.core = {}

mp.core.Label = class {
    constructor(text, position, options={}, keyOptions=null) {
        this.text = text;
        this.position = position;
        this.options = options;
        this.playersInColshape = [];
        this.label = this.draw();
        if(keyOptions){
            const { key, coords, callback } = keyOptions;
            this.key = key;
            this.coords = coords;
            this.callback = callback;
            this.colshape = mp.colshapes.newRectangle(this.coords.x, this.coords.y, this.coords.width, this.coords.height, this.coords.dimension)
            this.initKey();
        }
    }

    initKey() {
        
        const playerEnterColshapeHandler = (player, shape) => {
            if(shape == this.colshape) {
                this.playersInColshape[player.id] = true
            }
        }
          
        mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

        const playerExitColshapeHandler = (player, shape) => {
            if(shape == this.colshape) {
                delete this.playersInColshape[player.id]
            }
        }

        mp.events.add("playerExitColshape", playerExitColshapeHandler);

        mp.events.add(`Keydown::${this.key.toString(16)}`, (player) => {
            if(this.playersInColshape[player.id]) {
                this.callback(player)
            }
        });
    }

    draw() {
        return mp.labels.new(this.text, this.position, this.options);
    }
}

mp.core.Checkpoints = class {
    constructor(type, position, radius, direction, color, visible, dimension) {
        this.type = type;
        this.position = position;
        this.radius = radius;
        this.direction = direction;
        this.color = color;
        this.visible = visible;
        this.dimension = dimension;
        this.checkpoint = mp.checkpoints.new(type, position, radius, direction, color, visible, dimension);
    }

    hideFor(player) {
        this.checkpoint.hideFor(player);
    }

    showFor(player) {
        this.checkpoint.showFor(player);
    }
}