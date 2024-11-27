import { Role } from '../types';

export const PERMISSIONS = {
  'create:user': 'create:user',
  'update:user': 'update:user',
  'delete:user': 'delete:user',
  'assign:role': 'assign:role',
  'manage:system': 'manage:system',
  'manage:security': 'manage:security',
  'view:logs': 'view:logs',
  'access:data': 'access:data',
  'edit:roles': 'edit:roles'
} as const;

export type PermissionType = keyof typeof PERMISSIONS;

export const checkPermission = (userRole: Role, requiredPermission: PermissionType): boolean => {
  if (!userRole) {
    console.log('there is no user role found so the permission check will return false')
    return false
  };

  console.log('the role has these permissions:', userRole.permissions)
  return userRole.permissions.some(permission => permission.name === requiredPermission);
};

export const hasAnyPermission = (userRole: Role | undefined, permissions: PermissionType[]): boolean => {
  if (!userRole) return false;
  return permissions.some(permission => 
    userRole.permissions.some(p => p.name === permission)
  );
}; 