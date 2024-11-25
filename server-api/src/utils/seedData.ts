import { v4 as uuidv4 } from 'uuid';
import { mockDb, Permission, Role, User, PermissionName } from '../types';

const createPermissions = () => {
  const permissions: Permission[] = [
    { id: uuidv4(), name: 'create:user', description: 'Can create new users' },
    { id: uuidv4(), name: 'delete:user', description: 'Can delete users' },
    { id: uuidv4(), name: 'assign:role', description: 'Can assign roles to users' },
    { id: uuidv4(), name: 'manage:system', description: 'Can manage system settings' },
    { id: uuidv4(), name: 'manage:security', description: 'Can manage security settings' },
    { id: uuidv4(), name: 'view:logs', description: 'Can view system logs' },
    { id: uuidv4(), name: 'access:data', description: 'Can access system data' }
  ];

  permissions.forEach(permission => {
    mockDb.permissions.set(permission.id, permission);
  });

  return permissions;
};

const createRoles = (permissions: Permission[]) => {
  const getPermissionsByNames = (names: PermissionName[]) => 
    permissions.filter(p => names.includes(p.name));

  const roles: Role[] = [
    {
      id: uuidv4(),
      name: 'Account Admin',
      permissions: getPermissionsByNames([
        'create:user',
        'delete:user',
        'assign:role',
        'manage:system',
        'manage:security',
        'view:logs',
        'access:data'
      ])
    },
    {
      id: uuidv4(),
      name: 'Sys Admin',
      permissions: getPermissionsByNames([
        'manage:system',
        'view:logs',
        'access:data'
      ])
    },
    {
      id: uuidv4(),
      name: 'Security Admin',
      permissions: getPermissionsByNames([
        'assign:role',
        'manage:security',
        'view:logs'
      ])
    },
    {
      id: uuidv4(),
      name: 'User Admin',
      permissions: getPermissionsByNames([
        'create:user',
        'delete:user',
        'assign:role'
      ])
    },
    {
      id: uuidv4(),
      name: 'Public',
      permissions: []
    }
  ];

  roles.forEach(role => {
    mockDb.roles.set(role.id, role);
  });

  return roles;
};


const createUsers = (roles: Role[]) => {
  const findRoleByName = (name: Role['name']) => 
    roles.find(r => r.name === name);

  const adminUsers: User[] = [
    {
      id: uuidv4(),
      name: 'Account Admin',
      email: 'account.admin@example.com',
      password: 'admin123',
      roleId: findRoleByName('Account Admin')!.id,
      status: 'active'
    },
    {
      id: uuidv4(),
      name: 'System Admin',
      email: 'sys.admin@example.com',
      password: 'sysadmin123',
      roleId: findRoleByName('Sys Admin')!.id,
      status: 'active'
    },
    {
      id: uuidv4(),
      name: 'Security Admin',
      email: 'security.admin@example.com',
      password: 'security123',
      roleId: findRoleByName('Security Admin')!.id,
      status: 'active'
    },
    {
      id: uuidv4(),
      name: 'User Admin',
      email: 'user.admin@example.com',
      password: 'useradmin123',
      roleId: findRoleByName('User Admin')!.id,
      status: 'active'
    }
  ];

  const publicUsers: User[] = Array.from({ length: 5 }, (_, i) => ({
    id: uuidv4(),
    name: `Public User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    password: `user${i + 1}`,
    roleId: findRoleByName('Public')!.id,
    status: 'active'
  }));

  [...adminUsers, ...publicUsers].forEach(user => {
    mockDb.users.set(user.id, user);
  });
};

export const seedDatabase = () => {
  const permissions = createPermissions();
  const roles = createRoles(permissions);
  createUsers(roles);
  
  console.log('Database seeded successfully!');
  console.log(`Created ${mockDb.permissions.size} permissions`);
  console.log(`Created ${mockDb.roles.size} roles`);
  console.log(`Created ${mockDb.users.size} users`);
}; 