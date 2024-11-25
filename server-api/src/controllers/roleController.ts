import { Request, Response, NextFunction } from 'express';
import { mockDb, Role } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, permissions } = req.body;
    
    const newRole: Role = {
      id: uuidv4(),
      name,
      permissions: permissions || []
    };

    mockDb.roles.set(newRole.id, newRole);
    res.status(201).json(newRole);
  } catch (error) {
    next(error);
  }
};

export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const roles = Array.from(mockDb.roles.values());
    res.json(roles);
  } catch (error) {
    next(error);
  }
};

export const getRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const role = mockDb.roles.get(req.params.id);
    if (!role) {
      res.status(404).json({ message: 'Role not found' });
      return;
    }
    res.json(role);
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const roleId = req.params.id;
    const role = mockDb.roles.get(roleId);
    
    if (!role) {
      res.status(404).json({ message: 'Role not found' });
      return;
    }

    const updatedRole = { ...role, ...req.body };
    mockDb.roles.set(roleId, updatedRole);
    res.json(updatedRole);
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const roleId = req.params.id;
    if (!mockDb.roles.has(roleId)) {
      res.status(404).json({ message: 'Role not found' });
      return;
    }

    const users = Array.from(mockDb.users.values());
    const roleInUse = users.some(user => user.roleId === roleId);
    
    if (roleInUse) {
      res.status(400).json({ message: 'Cannot delete role as it is assigned to users' });
      return;
    }

    mockDb.roles.delete(roleId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 