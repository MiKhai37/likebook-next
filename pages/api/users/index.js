import { UserModel } from "../../../models";
import { getLoginSession } from "../../../lib/auth/auth";
import dbConnect from "../../../lib/database/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };

  // List of all users
  if (req.method === 'GET') {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 0;
    const skipIndex = (page - 1) * limit;

    const users = await UserModel.find()
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();

    return res.status(200).json({ message: 'Users found', users });
  }

  return res.status(400).json({ message: "Only GET and POST Requests, to modify or delete use /users/userId" })

};