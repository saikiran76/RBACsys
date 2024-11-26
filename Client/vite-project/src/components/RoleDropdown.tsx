import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Role } from '../types';
import { usePermissions } from '../hooks/usePermissions';

interface RoleDropdownProps {
  roles: Role[];
  selectedRoleId: string;
  userId: string;
  onRoleChange: (roleId: string) => void;
}

const RoleDropdown: React.FC<RoleDropdownProps> = ({
  roles,
  selectedRoleId,
  userId,
  onRoleChange
}) => {
  const { can } = usePermissions();
  const canAssignRole = can('assign:role');

  if (!canAssignRole) {
    const selectedRole = roles.find(role => role.id === selectedRoleId);
    return (
      <div className="px-4 py-1 bg-gray-100 rounded-md text-gray-700">
        {selectedRole?.name || 'No Role'}
      </div>
    );
  }

  return (
    <select
      value={selectedRoleId}
      onChange={(e) => onRoleChange(e.target.value)}
      className="px-4 py-1 bg-lime-50 rounded-md pr-8 appearance-none"
    >
      {roles.map((role) => (
        <option key={role.id} value={role.id}>
          {role.name}
        </option>
      ))}
    </select>
  );
};

export default RoleDropdown; 