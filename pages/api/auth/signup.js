import { createUser } from '../../../lib/auth/user';
import dbConnect from '../../../lib/database/dbConnect';

export default async function signup(req, res) {
  await dbConnect();
  try {
    await createUser(req.body);
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}