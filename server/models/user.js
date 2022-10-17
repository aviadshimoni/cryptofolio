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

  phone: {
    type: String,
  },

  birthDate: {
    type: Date,
  },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('user', userSchema);
