const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true}, // to be unique
    username: { type: String, required: true },
    password: { type: String, required: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    creationTimestamp: { type: Date, required: true },
    avatar: { type: String },
    friends: [{ type: String, ref:'User'}],
    friendRequests: [{ type: String, ref: "User" }],
    provider: { type: String },
    providerId: { type: String },
  }
);

module.exports = mongoose.model('User', UserSchema)