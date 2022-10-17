const mongoose = require('mongoose');

let transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  coinId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('transaction', transactionSchema);
