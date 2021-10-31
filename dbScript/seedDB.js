// This script seed the database with fake users, posts and comments
require('dotenv').config({ path: '../.env' });

const userArgs = process.argv.slice(2);
const nbUsers = userArgs[0] || 100
const nbPosts = userArgs[1] || 200
const nbComments = userArgs[2] || 600

const async = require('async');
const faker = require('faker');
faker.seed(37);
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserModel = require('./models/user');
const PostModel = require('./models/post');
const CommentModel = require('./models/comment');


const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log('Database connection opened')

const fakeUserCreate = async (cb) => {

  const gender = faker.random.arrayElement(['female', 'male']);

  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const email = faker.internet.email(firstName, lastName, 'likemail.com');
  const username = faker.internet.userName(firstName, lastName);

  //const password = faker.internet.password(len=12, memorable=true);
  const password = username;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = await new UserModel(
    {
      firstName,
      lastName,
      username,
      email,
      salt,
      hash,
      creationTimestamp: new Date().getTime(),
      avatar: faker.internet.avatar(), // no gender option for avatar
    }
  )

  newUser.save(function (err, user) {
    if (err) {
      console.error('Something wrong happened while creating new user', err);
      cb(err, null)
      return;
    };
    //console.log('user: ', user._id);
    cb(null, user)
  });
};

const fakePostCreate = async (cb) => {
  const users = await UserModel.find({}).exec();
  const random = Math.floor(Math.random() * users.length);
  const author = await UserModel.findOne().skip(random).exec();

  const newPost = await new PostModel(
    {
      author: author._id,
      textContent: faker.lorem.text(37),
      creationTimestamp: new Date().getTime(),
      updateTimestamp: new Date().getTime(),
    }
  )

  newPost.save(function (err, post) {
    if (err) {
      console.error('Something wrong happened while creating new post', err);
      cb(err, null);
      return;
    };
    //console.log('post: ', post._id);
    cb(null, post);
  });
};

const fakeCommentCreate = async (cb) => {
  const posts = await PostModel.find({}).exec();
  const random = Math.floor(Math.random() * posts.length);
  const post = await PostModel.findOne().skip(random).exec();

  const users = await UserModel.find({}).exec();
  const randomBis = Math.floor(Math.random() * users.length);
  const author = await UserModel.findOne().skip(randomBis).exec();

  const newComment = await new CommentModel(
    {
      post: post._id,
      author: author._id,
      textContent: faker.lorem.sentence(37),
      creationTimestamp: new Date().getTime(),
      updateTimestamp: new Date().getTime(),
    }
  )

  newComment.save(function (err, comment) {
    if (err) {
      console.error('Something wrong happened while creating new comment', err);
      cb(err, null);
      return;
    };
    //console.log('comment: ', comment._id);
    cb(null, comment);
  });
};

// async times runs n instances at the same times
const usersPopulate = (cb) => {
  console.time('Users Populating')
  console.log(`Users Populating (${nbUsers})`);

  async.times(nbUsers, function (n, next) {
    fakeUserCreate(function (err, user) {
      next(err, user);
    });
  }, function (err, users) {
    if (err) {
      console.error('usersPopulate error:', err)
      cb(err, null)
      return;
    };
    console.log(`${nbUsers} users created`)
    console.timeEnd('Users Populating')
    cb(null, users)
  })

};

const postsPopulate = (cb) => {
  console.time('Posts Populating')
  console.log(`Posts Populating (${nbPosts})`)

  async.times(nbPosts, function (n, next) {
    fakePostCreate(function (err, post) {
      next(err, post);
    });
  }, function (err, posts) {
    if (err) {
      console.error('postsPopulate error:', err)
      cb(err, null)
      return;
    };
    console.log(`${nbPosts} posts created`)
    console.timeEnd('Posts Populating')
    cb(null, posts)
  })
};

const commentsPopulate = (cb) => {
  console.time('Comments Populating')
  console.log(`Comments Populating (${nbComments})`)

  async.times(nbComments, function (n, next) {
    fakeCommentCreate(function (err, comment) {
      next(err, comment);
    });
  }, function (err, comments) {
    if (err) {
      console.error('commentsPopulate error:', err)
      cb(err, null)
      return;
    };
    console.log(`${nbComments} comments created`)
    console.timeEnd('Comments Populating')
    cb(null, comments)
  })
};

const dbSeeding = async () => {
  console.time('Database seeding')
  async.series([
    usersPopulate,
    postsPopulate,
    commentsPopulate
  ], function (err, results) {
    if (err) {
      console.error('async series error', err);
    } else {
      console.log('Database seeded');
    }
    mongoose.connection.close();
    console.log('Database connection closed');
    console.timeEnd('Database seeding');
    process.exit();
  });
};

dbSeeding();
