const mongoose = require('mongoose');

let transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  coinId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coin',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('transaction', transactionSchema);