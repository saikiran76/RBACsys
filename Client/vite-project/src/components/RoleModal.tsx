import React, { useState, useEffect } from 'react';
import { Role, Permission, PermissionType } from '../types';
import Button from './Button';
import { PERMISSIONS } from '../utils/permissions';

interface RoleModalProps {
  role?: Role;
  onClose: () => void;
  onSave: (roleData: Partial<Role>) => Promise<void>;
}

const RoleModal: React.FC<RoleModalProps> = ({ role, onClose, onSave }) => {
  const [roleName, setRoleName] = useState(role?.name || '');
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(role?.permissions || []);

  const availablePermissions = Object.keys(PERMISSIONS) as PermissionType[];

  const isPermissionSelected = (permName: PermissionType): boolean => {
    return selectedPermissions.some(p => p.name === permName);
  };

  const handlePermissionChange = (permName: PermissionType, checked: boolean) => {
    if (checked) {
      const newPermission: Permission = {
        id: `temp_${permName}`, // This will be replaced by the server
        name: permName,
        description: PERMISSIONS[permName]
      };
      setSelectedPermissions([...selectedPermissions, newPermission]);
    } else {
      setSelectedPermissions(selectedPermissions.filter(p => p.name !== permName));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      name: roleName,
      permissions: selectedPermissions,
      id: role?.id
    });
    onClose();
  };

  const handleOuterClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handleOuterClick}>
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white">
            {role ? `Edit Role: ${role.name}` : 'Create New Role'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Role Name</label>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Permissions</label>
            <div className="space-y-2">
              {availablePermissions.map(perm => (
                <label key={perm} className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    checked={isPermissionSelected(perm)}
                    onChange={(e) => handlePermissionChange(perm, e.target.checked)}
                    className="mr-2"
                  />
                  {perm}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={onClose} className="bg-gray-600">
              Cancel
            </Button>
            <Button type="submit" className="bg-lime-500">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleModal; 