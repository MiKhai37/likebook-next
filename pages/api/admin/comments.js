import { CommentModel } from "../../../models";
import { getLoginSession } from "../../../lib/auth/auth";

export default async function handler(req, res) {

  const session = await getLoginSession(req);
  if (!session.admin) {
    res.send({ error: 'You must be admin to use this.' });
  };

  // List of all comments
  if (req.method === 'GET') {
    const comments = await CommentModel.find().exec();
    const count = await CommentModel.countDocuments();

    const data = { count, comments };

    return res.status(200).json({ message: 'Comments found', data });
  }
  
}