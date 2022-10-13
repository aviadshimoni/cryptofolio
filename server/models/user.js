const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
  },
  // password: {
  //   type: String,
  //   required: true,
  // },
  gender: String,
  status: String,
  wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'walletSchema' },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('userdb', userSchema);
