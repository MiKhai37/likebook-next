const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    post: { type: String, ref: "Post", required: true },
    author: { type: String, ref: "User", required: true },
    textContent: { type: String, required: true },
    creationTimestamp: { type: Date, required: true},
    updateTimestamp: { type: Date, required: true},
    likes: [{ type: String, ref: "User" }],
  }
);

module.exports = mongoose.model('Comment', CommentSchema);