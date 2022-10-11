const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;
