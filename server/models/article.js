const mongoose = require("mongoose");

let articleSchema = new Schema({
    title: String,
    body: String,
    postedBy:  {type: mongoose.Schema.Types.ObjectId, ref: 'userSchema'},
    dateCreated: Date,
    // comments: [{body:"string", by: mongoose.Schema.Types.ObjectId}],
});

const articleDB = mongoose.model('articledb', articleSchema);
module.exports  = articleDB;