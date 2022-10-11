const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  gender: String,
  status: String,
  wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'walletSchema' },
});

const userDB = mongoose.model('userdb', userSchema);

module.exports = userDB;
