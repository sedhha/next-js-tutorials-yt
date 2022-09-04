import { NextApiHandler } from 'next';
import { withUserProtect } from 'middleware/withUserProtect';

const handler: NextApiHandler = async (req, res) => {
  return res
    .status(200)
    .json({ loggedIn: true, data: 'Some Secret User Data' });
};

export default withUserProtect(handler);
