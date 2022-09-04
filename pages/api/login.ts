import { NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';
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
  const user = users[email as keyof typeof users];

  if (!user)
    return res
      .status(401)
      .json({ loggedIn: false, error: 'User is not registered with the App' });

  if (password !== user.password)
    return res
      .status(401)
      .json({ loggedIn: false, error: 'Password is incorrect' });

  // JWT Implementation
  // User Email, User Role, expiration Time
  const tokenValidationTime = 300;
  const expiresIn = new Date().getTime() + 1000 * tokenValidationTime;

  const encryptedToken = jwt.sign(
    { email, role: user.role, expiresIn },
    process.env.JWT_SECRET_KEY ?? 'SOME_RANDOM_KEY'
  );

  return res
    .status(200)
    .json({ token: encryptedToken, type: 'Bearer', loggedIn: true }); // {email:email,password:password}
};

export default handler;
