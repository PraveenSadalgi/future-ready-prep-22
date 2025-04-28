
import { Express } from 'express-serve-static-core';
import { User } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
