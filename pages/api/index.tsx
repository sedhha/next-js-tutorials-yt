import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'POST') {
    const body = req.body;
    return res.status(200).json(body);
  }
  return res.status(200).json({ message: 'Hello World' });
};

export default handler;
