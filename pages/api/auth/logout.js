import { removeTokenCookie } from '../../../lib/auth/auth-cookies';
import dbConnect from '../../../lib/database/dbConnect';

export default async function logout(req, res) {
  await dbConnect();
  removeTokenCookie(res);
  res.writeHead(302, { Location: '/' });
  res.end();
};