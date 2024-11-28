import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, AuthContextType, LoginCredentials } from '../types/auth';
import { authApi } from '../utils/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    return {
      user: userData ? JSON.parse(userData) : null,
      token,
      isAuthenticated: !!token && !!userData
    };
  });

  const login = async (credentials: LoginCredentials) => {
    try {
      const { token, userId, roleId, roleName, email } = await authApi.login(credentials);
      const userData = { id: userId, email, roleId, roleName };
      
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      setAuth({
        user: userData,
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
    localStorage.removeItem('userData');
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