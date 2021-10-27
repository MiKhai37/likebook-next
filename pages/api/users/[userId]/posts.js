import { PostModel } from '../../../../models'
import { getLoginSession } from '../../../../lib/auth/auth';

export default async function handler(req, res) {

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to view the protected content on this page.' });
  };

  if (req.method === 'GET') {
    const posts = await PostModel.find({ author: req.query.userId }).populate('author').exec();
    const count = await PostModel.where({ author: req.query.userId }).countDocuments();

    const data = { count, posts }
    return res.status(200).json({ message: 'Posts found', data });
  }

  return res.status(400).json({ data: 'only GET request' });
}