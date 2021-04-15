import { Schema, model} from 'mongoose';

const guildSchema = new Schema({
    guildId: {
        type: String,
        required: true
    },
    createdTimestamp: {
        type: Number,
        required: true
    },
    entryTime: {
        type: Date,
        default: Date.now(),
        required: true
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    language: {
        type: String,
        enum: ['en', 'es', 'de', 'fr', 'pt'],
        default: 'es'
    },
    start: String,
    end: String,
    category: String,
    log: String
});

const Guild = model('guild', guildSchema);

export default Guild;
