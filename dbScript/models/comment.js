const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    textContent: { type: String, required: true },
    creationTimestamp: { type: Date, required: true},
    updateTimestamp: { type: Date, required: true},
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  }
);

module.exports = mongoose.model('Comment', CommentSchema);