import bcrypt from 'bcrypt';
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
  const userByEmail = await UserModel.findOne({ email });
  if (userByEmail) throw new Error('Email already used');
  const userByUsername = await UserModel.findOne({ username });
  if (userByUsername) throw new Error('Username already used');

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

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
  return bcrypt.compareSync(inputPassword, user.hash);
}