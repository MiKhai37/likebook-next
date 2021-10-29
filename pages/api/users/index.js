import { UserModel } from "../../../models";
import { getLoginSession } from "../../../lib/auth/auth";

export default async function handler(req, res) {

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };

  // List of all users
  if (req.method === 'GET') {
    const users = await UserModel.find().exec();
    const count = await UserModel.countDocuments();

    const data = { count, users };

    return res.status(200).json({ message: 'Users found', data });
  }

  return res.status(400).json({ message: "Only GET and POST Requests, to modify or delete use /users/userId" })

};