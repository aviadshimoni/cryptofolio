const mongoose = require('mongoose');

let coinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    shortName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('coins', coinSchema);
