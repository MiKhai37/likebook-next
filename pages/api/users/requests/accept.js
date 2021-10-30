import { UserModel } from '../../../../models';
import { getLoginSession } from '../../../../lib/auth/auth';
import { findUser } from '../../../../lib/auth/user';

export default async function handler(req, res) {

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };
  const user = (session && (await findUser(session))) ?? null;

  const userId = await user._id;

  if (req.method === 'GET') {
    return res
      .status(200)
      .json({ message: 'Nothing now'})
  }

  if (req.method === 'PUT') {
    const acceptedID = req.body.acceptedId;
    let asker = await UserModel.findById(acceptedID);
    let userFriendRequests = user.friendRequests;

    if (asker.friends.includes(acceptedID)) {
      return res.status(400).json({ message: 'Already friends' })
    } 

    if (!userFriendRequests.includes(acceptedID)) {
      return res.status(400).json({ message: 'This user doesn\'t request you' })
    }

    // Add friendship relation to both user
    asker.friends = [...asker.friends, userId];
    user.friends = [...user.friends, acceptedID];

    // Remove friendship request
    const index = user.friendRequests.indexOf(acceptedID);
    user.friendRequests.splice(index, 1);

    const updateUser = await user.save();
    const updateAsker = await asker.save();

    return res
      .status(200)
      .json({ updateUser })

  }

  if (request.method === 'DELETE') {
    const deleteID = req.body.deleteID;
  }

}