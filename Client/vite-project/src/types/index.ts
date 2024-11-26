import { PERMISSIONS } from "../utils/permissions";

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: keyof typeof PERMISSIONS;
  description?: string;
}

export type PermissionType = keyof typeof PERMISSIONS; 