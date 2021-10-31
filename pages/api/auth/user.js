import { getLoginSession } from '../../../lib/auth/auth';
import dbConnect from '../../../lib/database/dbConnect';

export default async function user(req, res) {
  await dbConnect();
  try {
    const session = await getLoginSession(req);
    //const user = (session && (await findUser(session))) ?? null; Too much info
    const user = session ?? null;

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(403).end('Authentication token is invalid, please log in');
  }
}