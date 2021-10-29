// This script create random friendship relation between users
require('dotenv').config({ path: '../.env' });

const userArgs = process.argv.slice(2);
const nbFriendships = userArgs[0] || 100

const async = require('async');
const mongoose = require('mongoose');

const UserModel = require('./models/user');


const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log('Database connection opened');

const findRandomUserPair = async () => {
  const users = await UserModel.find({}).exec();
  const random = Math.floor(Math.random() * users.length);
  const firstUser = users[random];
  console.log('First User: ', firstUser._id)

  const usersWithoutFirst = users.filter(user => user._id !== firstUser._id);
  const randomBis = Math.floor(Math.random() * usersWithoutFirst.length);
  const secondUser = usersWithoutFirst[randomBis]
  console.log('Second User: ', secondUser._id)

  UserModel
    .findOne({ _id: firstUser._id })
    .then(user => {
      const friends = user.friends;
      user.friends = [...friends, secondUser._id];
      user.save(function(err, user) {
        if (err) {
          console.error(err);
          return;
        };
        console.log(user);
      });
    });

  UserModel
    .findOne({ _id: secondUser._id })
    .then(user => {
      const friends = user.friends;
      user.friends = [...friends, firstUser._id]
      user.save(function(err, user) {
        if (err) {
          console.error(err);
          return;
        };
        console.log(user);
      });
    });

}

findRandomUserPair()
