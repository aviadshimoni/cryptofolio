const mongoose = require('mongoose');

let coinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String, // i.e: BTC, ETH
    required: true,
    unique: true
  },
});

module.exports = mongoose.model('coin', coinSchema);
