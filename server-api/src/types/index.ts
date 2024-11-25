export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  roleId: string;
  status: 'active' | 'inactive';
}

export interface Role {
  id: string;
  name: 'Account Admin' | 'Sys Admin' | 'Security Admin' | 'User Admin' | 'Public';
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: PermissionName;
  description: string;
}

export type PermissionName = 
  | 'create:user'
  | 'delete:user'
  | 'assign:role'
  | 'manage:system'
  | 'manage:security'
  | 'view:logs'
  | 'access:data';

export const mockDb = {
  users: new Map<string, User>(),
  roles: new Map<string, Role>(),
  permissions: new Map<string, Permission>()
}; 