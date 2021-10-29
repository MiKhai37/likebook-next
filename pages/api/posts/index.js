import { PostModel } from "../../../models";
import { getLoginSession } from "../../../lib/auth/auth";
import { findUser } from '../../../lib/auth/user'

export default async function handler(req, res) {

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };
  const user = (session && (await findUser(session))) ?? null;

  // Get all posts
  if (req.method === 'GET') {

    const posts = await PostModel.find({}).populate('author').exec();
    res.status(200).json({ data: posts });

  };

  // Create a post
  if (req.method === 'POST') {

    const post = await PostModel.create(
      {
        author: user._id,
        textContent: req.body.textContent,
        creationTimestamp: new Date().getTime(),
        updateTimestamp: new Date().getTime(),
      }
    );

    return res.status(200).json({ data: post });

  };

};