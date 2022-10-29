const mongoose = require('mongoose');

let coinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String, // i.e: BTC, ETH
    required: true,
    unique: true,
  },
  icon: {
    type: String,
  },
});

module.exports = mongoose.model('coin', coinSchema);
