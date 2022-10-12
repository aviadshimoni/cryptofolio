const mongoose = require('mongoose');

let coinSchema = new mongoose.Schema({
    name    : {
        type: String,
    },
    amount  : {
        type: Number,
    },
    network : {
        type: String,
    }


});

const coinDB = mongoose.model('coindb', coinSchema);

module.exports = coinDB;
