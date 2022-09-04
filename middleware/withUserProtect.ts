import { IVerifiedUser } from 'interfaces';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export const withUserProtect =
  (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
    const authorization = req.headers.authorization;
    if (!authorization)
      return res
        .status(401)
        .json({ loggedIn: false, error: 'Missing Auth token' });

    const [tokenType, token] = authorization.split(' ');
    if (tokenType.toLowerCase() !== 'bearer')
      return res
        .status(401)
        .json({ loggedIn: false, error: 'Invalid Authentication Type' });

    try {
      const verified = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY ?? 'SOME_RANDOM_KEY'
      ) as IVerifiedUser;
      const time = new Date().getTime();
      /*
          currentTime: time
          tokenExpiryTime: loginTime + 300s
  
          time < tokenExpiryTime
      */
      if (time > verified.expiresIn)
        return res.status(401).json({
          loggedIn: false,
          error: 'Session expired. Please login again',
        });
      req.body.user = verified;
      return handler(req, res);
    } catch (error) {
      return res
        .status(401)
        .json({ loggedIn: false, error: 'User is not authorized.' });
    }
  };
