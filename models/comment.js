import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

const CommentSchema = new Schema(
  {
    post: { type: String, ref: "Post", select: true, required: true },
    author: { type: String, ref: "User",select: true, required: true },
    textContent: { type: String, required: true },
    creationTimestamp: { type: Date, required: true},
    updateTimestamp: { type: Date, required: true},
    likes: [{ type: String, ref: "User" }],
  }
);

export const CommentModel = mongoose.models.Comment || model('Comment', CommentSchema);