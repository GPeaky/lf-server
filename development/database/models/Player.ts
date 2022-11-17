import {Schema, model} from 'mongoose';

const Player = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    data: {
        type: Object,
        required: true,
    },

    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'superUser'],
    },

    // Pending Crypto balance and waller
});

export default model<IPlayer>('Player', Player);
