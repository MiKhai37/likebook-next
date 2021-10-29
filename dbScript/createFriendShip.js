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

const findTwoDistinctUsers = async (cb) => {
  const users = await UserModel
    .find({}, function (err, users) {
      if (err) {
        console.error('users: ', err);
        cb(err, null);
        return;
      };
      //console.log(users);
      cb(null, users);
    })
}


const linkTwoUsers = async (cb) => {
  const users = await UserModel.find({}).exec();
  const random = Math.floor(Math.random() * users.length);
  const firstUser = users[random];
  console.log('First User: ', firstUser._id);

  const usersWithoutFirst = users.filter(user => user._id !== firstUser._id);
  const randomBis = Math.floor(Math.random() * usersWithoutFirst.length);
  const secondUser = usersWithoutFirst[randomBis];
  console.log('Second User: ', secondUser._id);

  const linkFirst = async (cb) => {
    await UserModel
      .findOne({ _id: firstUser._id })
      .then(user => {
        const friends = user.friends;
        user.friends = [...friends, secondUser._id];
        user.save(function (err, user) {
          if (err) {
            console.error('link first: ', err);
            cb(err, null);
            return;
          };
          //console.log(user);
          cb(null, user);
        });
      });
  }

  const linkSecond = async (cb) => {
    await UserModel
      .findOne({ _id: secondUser._id })
      .then(user => {
        const friends = user.friends;
        user.friends = [...friends, firstUser._id]
        user.save(function (err, user) {
          if (err) {
            console.error('link second: ', err);
            cb(err, null);
            return;
          };
          //console.log(user);
          cb(null, user);
        });
      });
  }

  async.parallel([
    function (callback) {
      linkFirst(callback);
    },
    function (callback) {
      linkSecond(callback);
    }
  ], function (err, results) {
    if (err) {
      console.error('parallel error: ', err);
      cb(err, null);
      return;
    }
    //console.log('parallel results: ', results)
    cb(null, results);
  })

}

const linkManyUsers = () => {
  console.log(`Linking users (${nbFriendships})`);

  async.timesSeries(nbFriendships, function (n, next) {
    console.log('friendship: ', n)
    linkTwoUsers(function (err, users) {
      next(err, users);
    });
  }, function (err, users) {
    if (err) {
      console.error('link many error: ', err);
      //cb(err, null)
      return;
    };
    //console.log(users);
    mongoose.connection.close();
    console.log('Database connection closed');
    console.timeEnd();
    process.exit();
    //cb(null, users);
  });
};

linkManyUsers();
