import { useAuth } from '../context/AuthContext';
import { checkPermission, hasAnyPermission } from '../utils/permissions';
import { useEffect, useState } from 'react';
import { roleApi } from '../utils/api';
import { Role, PermissionType } from '../types';

export const usePermissions = () => {
  const { auth } = useAuth();
  const [userRole, setUserRole] = useState<Role>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth.user?.roleId) {
        try {
          const role = await roleApi.getRoleById(auth.user.roleId);
          setUserRole(role);
        } catch (error) {
          console.error('Failed to fetch user role:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserRole();
  }, [auth.user]);

  return {
    can: (permission: PermissionType) => checkPermission(userRole, permission),
    hasAny: (permissions: PermissionType[]) => hasAnyPermission(userRole, permissions),
    loading,
    userRole
  };
}; 