'use client';

import React, { createContext, useContext, useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  activeCounterId: string;
  activeCounterName: string;
}

interface AuthContextType {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
}

const defaultUser: UserProfile = {
  name: 'Mitchell Admin',
  email: 'admin@odoo-demo.com',
  role: 'Administrador de Filas & Ventanillas',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  activeCounterId: 'v-3',
  activeCounterName: 'Ventanilla 3',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
