const mongoose = require('mongoose');

let transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  coinId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coin',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('transaction', transactionSchema);
