const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    author: { type: String, ref: "User", required: true },
    textContent: { type: String, required: true },
    creationTimestamp: { type: Date, required: true},
    updateTimestamp: { type: Date, required: true},
    comments: [{ type: String, ref: "Comment" }],
    likes: [{ type: String, ref: "User" }],
  }
);


module.exports = mongoose.model('Post', PostSchema);