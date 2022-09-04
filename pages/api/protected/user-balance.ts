import { NextApiHandler } from 'next';
import { IVerifiedUser } from 'interfaces';
import { withUserProtect } from 'middleware/withUserProtect';

const handler: NextApiHandler = async (req, res) => {
  const user = req.body.user as IVerifiedUser;
  const balance = Math.floor(Math.random() * 20000);
  return res.status(200).json({ loggedIn: true, data: balance });
};

export default withUserProtect(handler);
