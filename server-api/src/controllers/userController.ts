import { Request, Response, NextFunction } from 'express';
import { mockDb, User } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, roleId } = req.body;

    const newUser: User = {
      id: uuidv4(),
      name,
      email,
      password,
      roleId,
      status: 'active'
    };

    mockDb.users.set(newUser.id, newUser);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = Array.from(mockDb.users.values());
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = mockDb.users.get(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.id;
    const user = mockDb.users.get(userId);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const updatedUser = { ...user, ...req.body };
    mockDb.users.set(userId, updatedUser);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.id;
    if (!mockDb.users.has(userId)) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    mockDb.users.delete(userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getUsersByRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { roleId } = req.params;
    const users = Array.from(mockDb.users.values())
      .filter(user => user.roleId === roleId);
    
    res.json(users);
  } catch (error) {
    next(error);
  }
}; 