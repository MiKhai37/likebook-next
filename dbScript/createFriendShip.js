// This script create random friendship relation between users
require('dotenv').config({ path: '../.env' });

const userArgs = process.argv.slice(2);
const nbRelations = userArgs[0] || 100

const async = require('async');
const faker = require('faker');
//faker.seed(37);
const crypto = require('crypto');
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