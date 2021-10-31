import { CommentModel } from "../../../models";
import { getLoginSession } from "../../../lib/auth/auth";
import dbConnect from "../../../lib/database/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const session = await getLoginSession(req);
  if (process.env.NODE_ENV !== 'development') {
    if (!session.admin) {
      res.send({ error: 'You must be admin to use this.' });
    };
  };

  // List of all comments
  if (req.method === 'GET') {
    const comments = await CommentModel.find().exec();
    return res.status(200).json({ message: 'All comments', comments });
  }
  
}