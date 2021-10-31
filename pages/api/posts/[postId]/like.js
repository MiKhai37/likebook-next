import { PostModel } from "../../../../models";
import { getLoginSession } from "../../../../lib/auth/auth";
import { findUser } from "../../../../lib/auth/user";
import dbConnect from "../../../../lib/database/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };
  const user = (session && (await findUser(session))) ?? null;

  const post = await PostModel.findById(req.query.postId).exec();
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
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

    return res.status(200).json({ message: 'Post liked/unliked', updatePost });
  }
}