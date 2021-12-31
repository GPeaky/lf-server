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

    /** @param { () => Promise<T> } func 
     * @template T
     * @returns {Promise<T>}
    */
    async enqueue(func) {
        if(++this.__active > this.maxSimultaneously) {
            await new Promise(resolve => this.__queue.push(resolve));
        }

        try {
            return await func();
        } catch(err) {
            throw err;
        } finally {
            this.__active--;
            if(this.__queue.length) {
                this.__queue.shift()();
            }
        }
    }
}

// NumberPlate 
require('./NumberPlate');