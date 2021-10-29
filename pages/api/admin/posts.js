import { PostModel } from "../../../models";
import { getLoginSession } from "../../../lib/auth/auth";

export default async function handler(req, res) {

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to view the protected content on this page.' });
  };
  
  // List of all posts
  if (req.method === 'GET') {
    const posts = await PostModel.find().exec();
    const count = await PostModel.countDocuments();

    const data = { count, posts };

    return res.status(200).json({ message: 'Posts found', data });
  }
  
}