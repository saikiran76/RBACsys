import { Request, Response, NextFunction } from 'express';
import { mockDb, Permission } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const createPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description } = req.body;
    
    const newPermission: Permission = {
      id: uuidv4(),
      name,
      description
    };

    mockDb.permissions.set(newPermission.id, newPermission);
    res.status(201).json(newPermission);
  } catch (error) {
    next(error);
  }
};

export const getPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const permissions = Array.from(mockDb.permissions.values());
    res.json(permissions);
  } catch (error) {
    next(error);
  }
};

export const getPermissionById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const permission = mockDb.permissions.get(req.params.id);
    if (!permission) {
      res.status(404).json({ message: 'Permission not found' });
      return;
    }
    res.json(permission);
  } catch (error) {
    next(error);
  }
};

export const updatePermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const permissionId = req.params.id;
    const permission = mockDb.permissions.get(permissionId);
    
    if (!permission) {
      res.status(404).json({ message: 'Permission not found' });
      return;
    }

    const updatedPermission = { ...permission, ...req.body };
    mockDb.permissions.set(permissionId, updatedPermission);
    res.json(updatedPermission);
  } catch (error) {
    next(error);
  }
};

export const deletePermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const permissionId = req.params.id;
    if (!mockDb.permissions.has(permissionId)) {
      res.status(404).json({ message: 'Permission not found' });
      return;
    }

    const roles = Array.from(mockDb.roles.values());
    const permissionInUse = roles.some(role => 
      role.permissions.some(p => p.id === permissionId)
    );
    
    if (permissionInUse) {
      res.status(400).json({ message: 'Cannot delete permission as it is used in roles' });
      return;
    }

    mockDb.permissions.delete(permissionId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};