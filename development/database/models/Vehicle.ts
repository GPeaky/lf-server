import {Schema, model} from 'mongoose';

const Vehicle = new Schema({
    model: {
        type: String,
        required: true,
    },

    data: {
        type: Object,
        required: true,
    },
});

export default model<IVehicle>('Vehicle', Vehicle);
