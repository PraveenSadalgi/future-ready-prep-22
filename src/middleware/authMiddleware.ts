
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

interface DecodedToken {
  id: string;
}

interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      const secret = process.env.JWT_SECRET || '50b4d24edb360056d0bc2888db3d917c65af5f6a9edf4606832cc60ecb8e7cc7b88b66750684b14b4ebcc32d0ce281651d9a43a604612993fbe463b75c4640d2';
      const decoded = jwt.verify(token, secret) as DecodedToken;
      
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      console.error('Error in auth middleware:', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};
