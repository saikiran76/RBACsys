import { usePermissions } from '../hooks/usePermissions';
import type { PermissionType } from '../types';

interface PermissionGateProps {
  children: React.ReactNode;
  permission?: PermissionType;
  permissions?: PermissionType[];
}

const PermissionGate: React.FC<PermissionGateProps> = ({ 
  children, 
  permission,
  permissions = [] 
}) => {
  const { can, hasAny, loading } = usePermissions();

  console.log("the capabilities of the logged in user after mapping the permissions:", can, " ", hasAny)
  
  if (loading) return null;
  if (permission && !can(permission)) return null;
  if (permissions.length && !hasAny(permissions)) return null;
  
  return <>{children}</>;
};

export default PermissionGate; 