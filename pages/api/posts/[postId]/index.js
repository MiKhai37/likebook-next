import { PostModel, UserModel } from '../../../../models'
import { getLoginSession } from '../../../../lib/auth/auth';
import dbConnect from '../../../../lib/database/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };

  if (req.method === 'GET') {
    const postId = req.query.postId;
    const post = await PostModel.findOne({ _id: postId }).populate('author')

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    };

    return res.status(200).json({ post })
  }

  if (req.method === 'DELETE') {
    const postId = req.query.postId;

    const post = await PostModel.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    };

    return res.status(200).json({ post });

  }
}