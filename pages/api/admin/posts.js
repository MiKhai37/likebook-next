import { PostModel } from "../../../models";
import { getLoginSession } from "../../../lib/auth/auth";

export default async function handler(req, res) {

  const session = await getLoginSession(req);
  if (process.env.NODE_ENV !== 'development') {
    if (!session.admin) {
      res.send({ error: 'You must be admin to use this.' });
    };
  };
  
  // List of all posts
  if (req.method === 'GET') {
    const posts = await PostModel.find().exec();
    return res.status(200).json({ message: 'All posts', posts });
  }
  
}