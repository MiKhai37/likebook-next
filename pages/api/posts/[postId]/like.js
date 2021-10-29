import { PostModel } from "../../../../models";
import { getLoginSession } from "../../../../lib/auth/auth";
import { findUser } from "../../../../lib/auth/user";

export default async function handler(req, res) {

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };
  const user = (session && (await findUser(session))) ?? null;

  const post = await PostModel.findById(req.query.postId).exec();
  if (!post) {
    return res.status(404).json({ data: 'Post not found' });
  };

  // Toggle like
  if (req.method === 'PUT') {

    if (!post.likes.includes(user._id)) {
      post.likes = [...post.likes, user._id];
    } else {
      const index = post.likes.indexOf(user._id);
      post.likes.splice(index, 1);
    };

    const updatePost = await post.save();

    return res.status(200).json({ message: 'Post liked/unliked', data: updatePost });
  }
}