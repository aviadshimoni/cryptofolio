const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

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

  email: {
    type: String,
    required: true,
    index: { unique: true },
  },

  gender: {
    type: String,
    required: true
  },

  phone: {
    type: String
  },

  birthDate: {
    type: Date
  },

  balance : [{
      coin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coin'
      },
      amount: {
        type: Number
      }
  }]
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('users', userSchema);
