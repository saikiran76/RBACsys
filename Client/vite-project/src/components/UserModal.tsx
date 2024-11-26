import React, { useState, useEffect } from 'react';
import { User, Role } from '../types';
import { userApi, roleApi } from '../utils/api';
import Button from './Button';

interface UserModalProps {
  user?: User;
  onClose: () => void;
  onSave: () => Promise<void>;
}

const UserModal: React.FC<UserModalProps> = ({ onClose, user, onSave }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roleId: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        roleId: user.roleId,
      });
    }

    const fetchRoles = async () => {
      try {
        const rolesData = await roleApi.getRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };

    fetchRoles();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        await userApi.updateUser(user.id, formData);
      } else {
        await userApi.createUser(formData);
      }
      await onSave();
      onClose();
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl text-white mb-4">
          {user ? 'Edit User' : 'Add New User'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded text-white"
              required={!user}
            />
          </div>
          <div>
            <label className="block text-white mb-2">Role</label>
            <select
              value={formData.roleId}
              onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded text-white"
              required
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <Button onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button type="submit">
              {user ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal; 