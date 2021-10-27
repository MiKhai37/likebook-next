import { CommentModel } from '../../../../models'
import { getLoginSession } from '../../../../lib/auth/auth';

export default async function handler(req, res) {

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to view the protected content on this page.' });
  };

  if (req.method === 'GET') {
    const comments = await CommentModel.find({ post: req.query.postId }).populate('author').exec();
    const count = await CommentModel.where({ post: req.query.postId }).countDocuments();

    const data = { count, comments }
    return res.status(200).json({ message:'Comments found', data });
  }

  return res.status(400).json({ data: 'only GET request' });
}