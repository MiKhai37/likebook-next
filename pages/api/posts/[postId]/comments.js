import { CommentModel } from '../../../../models'
import { getLoginSession } from '../../../../lib/auth/auth';

export default async function handler(req, res) {

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };

  if (req.method === 'GET') {
    const comments = await CommentModel.find({ post: req.query.postId }).populate('author').exec();
    return res.status(200).json({ message: 'Comments found', comments });
  }

  return res.status(400).json({ message: 'only GET request' });
}