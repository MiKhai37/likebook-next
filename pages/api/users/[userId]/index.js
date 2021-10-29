import { UserModel } from "../../../../models";
import { getLoginSession } from "../../../../lib/auth/auth";

export default async function getUserApi(req, res) {

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };

  const user = await UserModel.findById(req.query.userId).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  };

  if (req.method === 'GET') {
    return res.status(200).json({ message: "User found", data: user });
  };

  if (req.method === 'PUT') {
    return res.status(400).json({ message: 'Not implemented' });
  };

  if (req.method === 'DELETE') {
    user.remove();
    return res.status(200).json({ message: "User deleted" });
  };
};