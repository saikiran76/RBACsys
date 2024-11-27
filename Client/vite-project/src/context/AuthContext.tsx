import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, AuthContextType, LoginCredentials } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BASE_URL = 'http://localhost:3000/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
  });

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { token, userId, roleId, roleName, email } = await response.json();
      
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