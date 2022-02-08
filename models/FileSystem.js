const {Schema, model} = require('mongoose');

const schema = new Schema({
    filename: {
        type: String,
        required: true
    },
    size: {
        type: Number
    },
    buffer: {
        type: Buffer,
    }
}, {
    timestamps: true
});

module.exports = model('FileSystem', schema);