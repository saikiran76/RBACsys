import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, AuthContextType, LoginCredentials } from '../types/auth';
import { authApi } from '../utils/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  });

  const login = async (credentials: LoginCredentials) => {
    try {
      const { token, userId, roleId, roleName, email } = await authApi.login(credentials);
      
      localStorage.setItem('token', token);
      
      setAuth({
        user: {
          id: userId,
          email: email,
          roleId: roleId,
          roleName: roleName
        }, 
        token,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 