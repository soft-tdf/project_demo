'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  company: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const DEFAULT_USER: User = {
  id: 'usr-admin-1',
  name: 'Mitchell Admin',
  email: 'admin@odoo-demo.com',
  role: 'Administrator',
  company: 'Odoo Enterprise Demo Ltd.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

const AuthContext = createContext<AuthContextType>({
  user: DEFAULT_USER,
  isAuthenticated: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(DEFAULT_USER);

  useEffect(() => {
    const storedUser = localStorage.getItem('odoo_demo_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(DEFAULT_USER);
      }
    }
  }, []);

  const login = (email: string) => {
    const newUser = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
    };
    setUser(newUser);
    localStorage.setItem('odoo_demo_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('odoo_demo_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
