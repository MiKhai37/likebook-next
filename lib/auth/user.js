import crypto from 'crypto';
import { UserModel } from '../../models';
import dbConnect from '../database/dbConnect';


export const createUser = async ({
  firstName,
  lastName,
  email,
  username,
  password,
}) => {
  await dbConnect();

  // Check for existing account
  const user = await UserModel.findOne({ email })
  if (user) throw new Error('Account already exists');

  // Hash the password
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')

  const newUser = await new UserModel(
    {
      firstName,
      lastName,
      username,
      email,
      hash,
      salt,
      creationTimestamp: new Date().getTime(),
    }
  );

  newUser.save(function (err, user) {
    if (err) {
      console.error('User Creation Failed' + err);
      return;
    };
    console.log('User Creation Succeed:' + user._id);
  });
};

export const findUser = async ({ username }) => {
  await dbConnect();
  const user = await UserModel.findOne({ username: username }).exec();
  return user;
};

export const validatePassword = (user, inputPassword) => {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex');
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}