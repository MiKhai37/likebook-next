import { CommentModel } from "../../../../models";
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

  const comment = await CommentModel.findById(req.query.commentId).exec();
  if (!comment) {
    return res.status(404).json({ message: 'Post not found' });
  };

  // Toggle like
  if (req.method === 'PUT') {

    if (!comment.likes.includes(user._id)) {
      comment.likes = [...comment.likes, user._id];
    } else {
      const index = comment.likes.indexOf(user._id);
      comment.likes.splice(index, 1);
    };

    const updatedComment = await comment.save();

    return res.status(200).json({ message: 'Comment liked/unliked', updatedComment });
  }
}