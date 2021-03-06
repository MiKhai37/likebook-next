import { PostModel } from "../../../models";
import { getLoginSession } from "../../../lib/auth/auth";
import { findUser } from '../../../lib/auth/user'
import dbConnect from "../../../lib/database/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };
  

  // Get all posts
  if (req.method === 'GET') {

    const posts = await PostModel.find({}).populate('author').exec();
    res.status(200).json({ posts });

  };

  // Create a post
  if (req.method === 'POST') {
    const user = (session && (await findUser(session))) ?? null;
    const post = await PostModel.create(
      {
        author: user._id,
        textContent: req.body.textContent,
        creationTimestamp: new Date().getTime(),
        updateTimestamp: new Date().getTime(),
      }
    );

    return res.status(200).json({ post });

  };

};