const BASE_URL = 'https://rbacsys.onrender.com/api';

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

export const api = async (endpoint: string, options: ApiOptions = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  try {
    console.log(`Making ${options.method || 'GET'} request to:`, `${BASE_URL}${endpoint}`);
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: options.method || 'GET',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    console.log('Response status:', response.status);

    const data = await response.text();
    console.log('Response data:', data);

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('token');
      window.location.replace('/login');
      throw new Error('Authentication failed');
    }

    if (!response.ok) {
      throw new Error(
        data ? JSON.parse(data).message || 'API request failed' : 'API request failed'
      );
    }

    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const userApi = {
  getUsers: () => api('/users'),
  getUsersByRole: (roleId: string) => api(`/users/role/${roleId}`),
  createUser: (userData: any) => api('/users', { method: 'POST', body: userData }),
  updateUser: (id: string, userData: any) => api(`/users/${id}`, { method: 'PUT', body: userData }),
  deleteUser: (id: string) => api(`/users/${id}`, { method: 'DELETE' }),
};

export const roleApi = {
  getRoles: () => api('/roles'),
  getRoleById: (id: string) => api(`/roles/${id}`),
  createRole: (roleData: any) => api('/roles', { 
    method: 'POST', 
    body: { 
      ...roleData,
      permissions: roleData.permissions || []
    } 
  }),
  updateRole: (id: string, roleData: any) => api(`/roles/${id}`, { 
    method: 'PUT', 
    body: { 
      ...roleData,
      permissions: roleData.permissions || []
    } 
  }),
  deleteRole: (id: string) => api(`/roles/${id}`, { method: 'DELETE' }),
  updatePermissions: (id: string, permissions: string[]) => api(`/roles/${id}/permissions`, {
    method: 'PUT',
    body: { permissions }
  })
};

export const authApi = {
  login: (credentials: { email: string; password: string }) => 
    api('/users/login', { 
      method: 'POST', 
      body: credentials,
    }),
  getCurrentUser: () => api('/users/me'),
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}; 