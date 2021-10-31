import { PostModel } from '../../../models'
import { getLoginSession } from '../../../lib/auth/auth';
import dbConnect from '../../../lib/database/dbConnect';
import { findUser } from '../../../lib/auth/user';

export default async function handler(req, res) {
  await dbConnect();

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };
  const user = (session && (await findUser(session))) ?? null; // Too much info

  if (req.method === 'GET') {
    const posts = await PostModel.find({ author: user._id }).populate('author').exec();
    return res.status(200).json({ posts });
  }

  return res.status(400).json({ message: 'only GET request' });
}