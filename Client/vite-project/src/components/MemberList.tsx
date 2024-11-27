import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FiSearch, FiEdit, FiTrash2 } from 'react-icons/fi';
import Button from './Button';
import { useApiState } from '../hooks/useApiState';
import { userApi, roleApi } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';
import Toast from './Toast';
import { User, Role } from '../types';
import PermissionGate from './PermissionGate';
import UserModal from './UserModal';
import RoleModal from './RoleModal';
// import RoleModal from './RoleModal';
import RoleDropdown from './RoleDropdown';
import { usePermissions } from '../hooks/usePermissions';
import { useAuth } from '../context/AuthContext';
import RoleList from './RoleList';
import { useTheme } from '../context/ThemeContext';

interface MemberListProps {
  initialMembers?: User[];
  initialRoles?: Role[];
}

const MemberList: React.FC<MemberListProps> = ({ 
  initialMembers = [], 
  initialRoles = [] 
}) => {
  const [members, setMembers] = useState<User[]>(initialMembers);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'email'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { loading, error} = useApiState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const { can } = usePermissions();
  const canCreateUser = can('create:user');
  const canManageSecurity = can('manage:security');
  // const canDeleteUser = can('delete:user');
  // const canUpdateUser = can('update:user');
  const loggedInUser = useAuth();
  const [selectedRoleToEdit, setSelectedRoleToEdit] = useState<Role | undefined>();
  const [roleManagementView, setRoleManagementView] = useState<'list' | 'edit' | 'create'>('list');
  const { isDarkMode } = useTheme();

  console.log('trying to access thelogged in user:', loggedInUser)

  const fetchData = useCallback(async () => {
    try {
      const [usersData, rolesData] = await Promise.all([
        userApi.getUsers(),
        roleApi.getRoles()
      ]);
      
      if (usersData){
        // WE HAVE TO FILTER OUT THE LOGGED IN USER FROM THE LIST OF USERS
        // const filteredUsers = usersData.filter((user: User) => user.id !== loggedInUser?.id)
         setMembers(usersData)
      };
      if (rolesData) setRoles(rolesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRoleChange = useCallback(async (userId: string, roleId: string) => {
    try {
      await userApi.updateUser(userId, { 
        roleId,
        status: 'active'
      });
      await fetchData();
    } catch (error) {
      console.error('Error updating role:', error);
    }
  }, [fetchData]);

  const filteredAndSortedMembers = useMemo(() => {
    return members
      .filter(member => {

        if(loggedInUser && loggedInUser.auth.user){
          if (loggedInUser && member.id === loggedInUser.auth.user.id) return false;
        }

        const matchesSearch = 
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.email.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesRole = !selectedRole || member.roleId === selectedRole;
        
        const memberRole = roles.find(r => r.id === member.roleId)?.name;
        const matchesTab = 
          activeTab === 'all' || 
          (activeTab === 'admins' && ['Account Admin', 'Admin', 'Sys Admin', 'Security Admin', 'User Admin'].includes(memberRole || '')) ||
          (activeTab === 'users' && memberRole === 'Public');
        
        return matchesSearch && matchesRole && matchesTab;
      })
      .sort((a, b) => {
        const compareValue = sortOrder === 'asc' ? 1 : -1;
        return a[sortBy] > b[sortBy] ? compareValue : -compareValue;
      });
  }, [members, searchQuery, selectedRole, activeTab, sortBy, sortOrder, roles]);

  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedMembers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedMembers, currentPage]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUserSaved = useCallback(async () => {
    setIsModalOpen(false);
    setSelectedUser(undefined);
    await fetchData();
  }, [fetchData]);

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userApi.deleteUser(userId);
        await fetchData();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleStatusChange = async (userId: string, status: 'active' | 'inactive') => {
    try {
      await userApi.updateUser(userId, { status });
      await fetchData();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const Pagination = () => {
    const totalPages = Math.ceil(filteredAndSortedMembers.length / itemsPerPage);
    
    return (
      <div className="flex justify-end mt-1.5 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 
                ? 'bg-lime-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  const handleRoleSaved = async (roleData: Partial<Role>) => {
    try {
      if (roleData.id) {
        await roleApi.updateRole(roleData.id, roleData);
      } else {
        await roleApi.createRole(roleData);
      }
      setIsRoleModalOpen(false);
      await fetchData();
    } catch (error) {
      console.error('Failed to save role:', error);
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`${
      isDarkMode 
        ? 'bg-gray-800' 
        : 'bg-white/70 border border-gray-300 shadow-sm'
    } backdrop-blur-md absolute top-[8rem] translate-x-[5%] rounded-lg p-6 sm:min-w-[24rem] md:min-w-[40rem] lg:min-w-[55rem] xl:min-w-[70rem] mx-3 ml-8`}>
      {error && <Toast message={error.message} type="error" onClose={() => {}} />}
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Members ({members.length})
          </h1>
        </div>
        <div className="flex space-x-3">
          {canCreateUser && (
            <Button 
              onClick={() => setIsModalOpen(true)}
              className={isDarkMode 
                ? "bg-lime-500 hover:bg-lime-600" 
                : "bg-[#022213] hover:bg-lime-400 text-white/70 hover:text-black"}
            >
              Add User
            </Button>
          )}
          {canManageSecurity && (
            <Button 
              onClick={() => {
                setIsRoleModalOpen(true);
                setRoleManagementView('list');
              }}
              className={isDarkMode 
                ? "bg-gray-600 hover:bg-gray-700" 
                : "bg-[#022213] hover:bg-lime-400 text-white/70 hover:text-black"}
            >
              Edit Roles
            </Button>
          )}
        </div>
      </div>

      <div className="flex space-x-8 border-b mb-6">
        {['all', 'admins', 'users'].map((tab) => (
          <button
            key={tab}
            className={`pb-2 ${
              activeTab === tab 
                ? 'border-b-2 border-lime-500 text-lime-500' 
                : isDarkMode ? 'text-gray-500' : 'text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'all' ? 'All' : tab === 'admins' ? 'Admins' : 'Public Users'}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 ${
              isDarkMode ? 'bg-lime-50' : 'bg-gray-100'
            } rounded-md`}
          />
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className={`px-4 py-2 ${
            isDarkMode ? 'bg-lime-50' : 'bg-gray-100'
          } rounded-md`}
        >
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`text-left ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <th className="py-3 px-6 cursor-pointer group" onClick={() => {
                setSortOrder(sortOrder === 'asc' && sortBy === 'name' ? 'desc' : 'asc');
                setSortBy('name');
              }}>
                <div className="flex items-center">
                  User
                  <span className={`ml-2 ${sortBy === 'name' ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                    {sortBy === 'name' && sortOrder === 'asc' ? '↑' : '↓'}
                  </span>
                </div>
              </th>
              <th className="py-3 px-6 cursor-pointer group" onClick={() => {
                setSortOrder(sortOrder === 'asc' && sortBy === 'email' ? 'desc' : 'asc');
                setSortBy('email');
              }}>
                <div className="flex items-center">
                  Email
                  <span className={`ml-2 ${sortBy === 'email' ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                    {sortBy === 'email' && sortOrder === 'asc' ? '↑' : '↓'}
                  </span>
                </div>
              </th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMembers.map((member) => (
              <tr key={member.id} className={`border-b ${
                isDarkMode ? 'border-gray-700' : 'border-gray-600'
              }`}>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img 
                        src="/default-avatar.png"
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className={isDarkMode ? 'text-white' : 'text-black'}>
                        {member.name}
                      </p>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-700'}>
                        {member.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className={`py-4 px-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {member.email}
                </td>
                <td className="py-4 px-6">
                  <RoleDropdown
                    roles={roles}
                    selectedRoleId={member.roleId}
                    userId={member.id}
                    onRoleChange={(roleId) => handleRoleChange(member.id, roleId)}
                  />
                </td>
                <td className="py-4 px-6">
                  <select
                    value={member.status}
                    onChange={(e) => handleStatusChange(member.id, e.target.value as 'active' | 'inactive')}
                    className={`${
                      isDarkMode 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-[#022213] text-white/70'
                    } rounded px-2 py-1`}
                    disabled={!can('manage:security')}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <PermissionGate permission="update:user">
                      <button
                        onClick={() => handleEditUser(member)}
                        className={isDarkMode 
                          ? "text-gray-400 hover:text-gray-300"
                          : "text-gray-700 hover:text-gray-900"
                        }
                      >
                        <FiEdit />
                      </button>
                    </PermissionGate>
                    <PermissionGate permission="delete:user">
                      <button
                        onClick={() => handleDeleteUser(member.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FiTrash2 />
                      </button>
                    </PermissionGate>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />

      {isModalOpen && (
        <UserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUserSaved}
        />
      )}

    {isRoleModalOpen && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsRoleModalOpen(false);
            setRoleManagementView('list');
          }
        }}
      >
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          {roleManagementView === 'list' ? (
            <RoleList
              roles={roles}
              onEditRole={(role) => {
                setSelectedRoleToEdit(role);
                setRoleManagementView('edit');
              }}
              onCreateRole={() => {
                setSelectedRoleToEdit(undefined);
                setRoleManagementView('create');
              }}
              onClose={() => setIsRoleModalOpen(false)}
            />
          ) : (
            <RoleModal
              role={roleManagementView === 'edit' ? selectedRoleToEdit : undefined}
              onClose={() => {
                setRoleManagementView('list');
                setSelectedRoleToEdit(undefined);
              }}
              onSave={async (roleData) => {
                await handleRoleSaved(roleData);
                setRoleManagementView('list');
              }}
            />
          )}
        </div>
      </div>
    )}
    </div>
  );
};

export default MemberList;