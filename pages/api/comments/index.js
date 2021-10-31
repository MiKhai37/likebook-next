import { CommentModel, UserModel } from "../../../models"
import { getLoginSession } from "../../../lib/auth/auth";
import dbConnect from "../../../lib/database/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };

  if (req.method === 'GET') {
    const comments = await CommentModel.find().populate('post').exec();
    return res.status(200).json({ message: 'Comments found', comments });
  };

  if (req.method === 'POST') {

    const newComment = await CommentModel.create(
      {
        post: req.body.postId,
        author: req.body.userId,
        textContent: req.body.textContent,
        creationTimestamp: new Date().getTime(),
        updateTimestamp: new Date().getTime(),
        likes: [],
      }
    );

    return res.json({ message: 'Comment created', newComment });

  }

};