const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    coinId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coin'
    },
    date: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('transacation', transactionSchema);
