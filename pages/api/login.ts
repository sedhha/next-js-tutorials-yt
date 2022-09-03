import { NextApiHandler } from 'next';
import users from 'users.json';

const handler: NextApiHandler = (req, res) => {
  const authorization = req.headers.authorization;
  /*
        Basic Authentication: base64encoded string
        string :- email:password | clientId:secret
    */

  if (!authorization)
    return res
      .status(401)
      .json({ loggedIn: false, error: 'Missing Auth token' });

  const [tokenType, encodedToken] = authorization.split(' '); //Basic ZW1haWw6cGFzc3dvcmQ=
  if (tokenType.toLowerCase() !== 'basic')
    return res
      .status(401)
      .json({ loggedIn: false, error: 'Invalid Authentication Type' });

  const decodedToken = Buffer.from(encodedToken, 'base64').toString('utf-8');
  const [email, password] = decodedToken.split(':');

  if (!users[email as keyof typeof users])
    return res
      .status(401)
      .json({ loggedIn: false, error: 'User is not registered with the App' });

  if (password !== users[email as keyof typeof users])
    return res
      .status(401)
      .json({ loggedIn: false, error: 'Password is incorrect' });

  return res.status(200).json({ email, password, loggedIn: true }); // {email:email,password:password}
};

export default handler;
