const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    shortName: {
        type: String,
        required: true,
    },
    network: {
        type: String
    }
});

module.exports = mongoose.model('coin', coinSchema);
