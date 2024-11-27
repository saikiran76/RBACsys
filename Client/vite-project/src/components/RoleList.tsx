import React from 'react';
import { Role } from '../types';
import Button from './Button';
import Card from './Card';

interface RoleListProps {
  roles: Role[];
  onEditRole: (role: Role) => void;
  onCreateRole: () => void;
  onClose: () => void;
}

const RoleList: React.FC<RoleListProps> = ({ roles, onEditRole, onCreateRole, onClose }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white px-3 py-1 rounded bg-gray-700"
          >
            ← Back
          </button>
          <h2 className="text-xl text-white">Role Management</h2>
        </div>
        <Button
          onClick={onCreateRole}
          className="bg-lime-500 hover:bg-lime-600"
        >
          Create New Role
        </Button>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id} className="w-full">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg text-white font-medium">{role.name}</h3>
                <Button
                  onClick={() => onEditRole(role)}
                  className="bg-lime-500 hover:bg-lime-600 text-sm"
                >
                  Edit
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((perm) => (
                  <span
                    key={perm.id}
                    className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                  >
                    {perm.name}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoleList;

