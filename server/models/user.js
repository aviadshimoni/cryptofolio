const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
  phone: String,
  birthday: Date,

  wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'walletSchema'},
});

const userDB = mongoose.model('userdb', userSchema);

module.exports = userDB;
