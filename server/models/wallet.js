const mongoose = require('mongoose');

let walletSchema = new mongoose.Schema({
    name    : {
        type: String,
        required: true,
    },
    coins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'coinSchema'}],
});

const walletDB = mongoose.model('walletdb', walletSchema);

module.exports = walletDB;
