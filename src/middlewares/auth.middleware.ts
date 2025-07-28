import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken;
    console.log(token)

    if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
    }

    const decoded = verifyAccessToken(token) as { userId: string; role: string };

    console.log(decoded)

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired access token.' });
  }
};
