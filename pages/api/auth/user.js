import { getLoginSession } from '../../../lib/auth/auth';
import dbConnect from '../../../lib/database/dbConnect';
import { findUser } from '../../../lib/auth/user';

export default async function user(req, res) {
  await dbConnect();
  try {
    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null; // Too much info

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(403).end('Authentication token is invalid, please log in');
  }
}