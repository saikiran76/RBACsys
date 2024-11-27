import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
import { mockDb } from '../types';
import { config } from '../config';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const users = Array.from(mockDb.users.values());
    const user = users.find(u => u.email === email);

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    if (user.password !== password) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    console.log('User found:', {
      userId: user.id,
      roleId: user.roleId,
      roleName: mockDb.roles.get(user.roleId)?.name
    });

    const token = jwt.sign(
      { userId: user.id, roleId: user.roleId },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    res.json({ token, userId: user.id, roleId:user.roleId, roleName: mockDb.roles.get(user.roleId)?.name, email: user.email});
  } catch (error) {
    next(error);
  }
}; 