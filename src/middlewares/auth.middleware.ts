import type { Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';
import type { AuthRequest } from '../types/type.js';



/**
 * Authenticates the user before actions (Authentication Middleware) 
 */
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
    }

    const decoded = verifyAccessToken(token) as { userId: string; role: string, email: string, name: string };

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      email: decoded.email,
      name: decoded.name
    };

    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired access token.' });
  }
};

/**
 * Role-based authorization middleware.
 * @param allowedRoles One or more allowed roles.
 */
export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions.' });
    }

    next();
  };
};
