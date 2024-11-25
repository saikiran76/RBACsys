import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { mockDb } from '../types';
import { config } from '../config';

const JWT_SECRET = config.jwt.secret;

interface JwtPayload {
  userId: string;
  roleId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: 'Invalid token' });
        return;
      }
      req.user = decoded as JwtPayload;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export const checkPermission = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const role = mockDb.roles.get(req.user.roleId);
      
      if (!role) {
        res.status(403).json({ message: 'Role not found' });
        return;
      }

      const hasPermission = role.permissions.some(
        permission => permission.name === requiredPermission
      );

      if (!hasPermission) {
        res.status(403).json({ 
          message: `Missing required permission: ${requiredPermission}` 
        });
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}; 