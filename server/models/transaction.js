const mongoose = require('mongoose');

let transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    coinId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coins',
        required: true
    },
    date: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('transacations', transactionSchema);
