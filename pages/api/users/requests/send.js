import { UserModel } from '../../../../models';
import { getLoginSession } from '../../../../lib/auth/auth';
import { findUser } from '../../../../lib/auth/user';
import dbConnect from '../../../../lib/database/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  const session = await getLoginSession(req);
  if (!session) {
    res.send({ error: 'You must be sign in to use this.' });
  };
  const user = (session && (await findUser(session))) ?? null;

  const userId = await user._id;

  // See user friend requests
  if (req.method === 'GET') {
    return res
      .status(200)
      .json({ friendRequests: decodedToken.data.friendRequests });
    
  };

  // Send a friend Request
  // TODO Add 404 Error
  if (req.method === 'PUT') {
    const senderID = userId;
    const receiverID = req.body.receiverID;

    if (!receiverID) {
      return res.status(400).json({ message: 'Missing/Uncompleted Body' });
    };

    if (senderID === receiverID) {
      return res.status(400).json({ message: 'Cannot friend yourself' });
    };
    
    let receiver = await UserModel.findOne({ _id: receiverID }).exec();

    if (receiver.friendRequests.includes(senderID)) {
      return res.status(400).json({ message: 'Friend Request already sent'})
    };

    if (receiver.friends.includes(senderID)) {
      return res.status(400).json({ message: 'You are already friends'})
    };
    
    receiver.friendRequests = [...receiver.friendRequests, senderID]
  
    const updateReceiver = await receiver.save()
    
    return res.status(200).json({ updateReceiver })
  }

  return res.status(500).json({ message: 'Only GET and PUT requests' })

}