import { CommentModel } from "../../../../models"
import { getLoginSession } from "../../../../lib/auth/auth";

export default async function handler(req, res) {

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };

  const comment = await CommentModel.findById(req.query.commentId).exec();

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  };

  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Comment found', data: comment });
  };

  if (req.method === 'PUT') {
    return res.status(400).json({ message: 'Not implemented' });
  };

  if (req.method === 'DELETE') {
    await comment.remove();
    return res.status(200).json({ message: "Comment deleted" });
  };

};