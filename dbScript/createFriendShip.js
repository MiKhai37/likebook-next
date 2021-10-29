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

  let randomA;
  let randomB;

  while(randomA === randomB) {
    randomA = Math.floor(Math.random() * users.length);
    randomB = Math.floor(Math.random() * users.length);
  };

  const firstUser = users[randomA];
  const secondUser = users[randomB];
  //console.log('First User: ', firstUser._id);
  //console.log('Second User: ', secondUser._id);

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
  console.time('Friendships');
  console.log(`Linking user friendships (${nbFriendships})`);

  async.timesSeries(nbFriendships, function (n, next) {
    //console.log('friendship: ', n)
    linkTwoUsers(function (err, users) {
      next(err, users);
    });
  }, function (err, users) {
    if (err) {
      console.error('link many error: ', err);
      return;
    };
    //console.log(users);
    console.log(`${nbFriendships} friendships linked`)
    mongoose.connection.close();
    console.log('Database connection closed');
    console.timeEnd('Friendships');
    process.exit();
  });
};

linkManyUsers();
