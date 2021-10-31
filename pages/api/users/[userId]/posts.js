import { PostModel } from '../../../../models'
import { getLoginSession } from '../../../../lib/auth/auth';
import dbConnect from '../../../../lib/database/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };

  if (req.method === 'GET') {
    const posts = await PostModel.find({ author: req.query.userId }).populate('author').exec();
    return res.status(200).json({ message: 'Posts found', posts });
  }

  return res.status(400).json({ message: 'only GET request' });
}