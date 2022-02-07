const {Schema, model} = require('mongoose');

const schema = new Schema({
    filename: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    buffer: {
        type: Buffer,
    }
}, {
    timestamps: true
});

module.exports = model('FileSystem', schema);