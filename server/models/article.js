const mongoose = require('mongoose');

let articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
  },
  // comments: [{body:"string", by: mongoose.Schema.Types.ObjectId}],
});

const articleDB = mongoose.model('articledb', articleSchema);
module.exports = articleDB;
