const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        default: null,
    },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('Role', roleSchema);
