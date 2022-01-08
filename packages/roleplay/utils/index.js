mp.utils = {}

// Wait
mp.utils.wait = async(ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Queue
mp.utils.Queue = class {
    constructor(maxSimultaneously = 1) {
        this.maxSimultaneously = maxSimultaneously;
        this.__active = 0;
        this.__queue = [];
    }

    async enqueue(func) {
        if(++this.__active > this.maxSimultaneously) {
            await new Promise(resolve => this.__queue.push(resolve));
        }

        try {
            return await func();
        } finally {
            this.__active--;
            if(this.__queue.length) {
                this.__queue.shift()();
            }
        }
    }
}