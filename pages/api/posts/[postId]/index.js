import { PostModel, UserModel } from '../../../../models'
import { getLoginSession } from '../../../../lib/auth/auth';

export default async function handler(req, res) {

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };

  if (req.method === 'GET') {
    const postId = req.query.postId;
    const post = await PostModel.find({ _id: postId })

    if (!post) {
      return res.status(404).json({ success: false, data: 'Post not found' });
    };

    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, data: 'Post API Error' })
    }

    return res.status(200).json(post)
  }

  if (req.method === 'DELETE') {
    const postId = req.query.postId;

    const post = await PostModel.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ data: 'Post not found' });
    };

    return res.status(200).json({ data: post });

  }
}