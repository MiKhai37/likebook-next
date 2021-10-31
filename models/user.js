import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';


const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    username: { type: String, required: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    creationTimestamp: { type: Date, required: true },
    avatar: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref:'User'}],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    provider: { type: String },
    providerId: { type: String },
  }
);

export const UserModel = mongoose.models.User || model('User', UserSchema); //Avoid overcreation of model